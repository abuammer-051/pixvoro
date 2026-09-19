import os
import logging
from fastapi import FastAPI, HTTPException, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, HttpUrl
import yt_dlp.version

from downloader import get_video_info, download_video_file

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Video Downloader Pro API",
    description="High-performance video metadata and download API powered by yt-dlp",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VideoInfoRequest(BaseModel):
    url: str

def cleanup_temp_file(path: str):
    """Safely remove temporary file after streaming completes."""
    try:
        if os.path.exists(path):
            os.remove(path)
            logger.info(f"Cleaned up temp file: {path}")
    except Exception as e:
        logger.warning(f"Error cleaning up temp file {path}: {e}")

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "ytdlp_version": yt_dlp.version.__version__,
        "service": "Video Downloader Pro"
    }

@app.post("/api/info")
async def fetch_info(req: VideoInfoRequest):
    url = req.url.strip()
    if not url:
        raise HTTPException(status_code=400, detail="Please provide a valid video URL")
    
    try:
        info = get_video_info(url)
        return {"success": True, "data": info}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Failed to fetch video info: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process video: {str(e)}")

@app.get("/api/download")
async def download_file(
    background_tasks: BackgroundTasks,
    url: str = Query(..., description="Video source URL"),
    format_id: str = Query("720p", description="Requested format identifier"),
    is_audio: bool = Query(False, description="Whether requesting audio-only conversion")
):
    try:
        file_path, download_filename = download_video_file(url, format_id, is_audio)
        
        # Schedule cleanup after download completes
        background_tasks.add_task(cleanup_temp_file, file_path)
        
        media_type = "audio/mpeg" if is_audio else "video/mp4"
        return FileResponse(
            path=file_path,
            filename=download_filename,
            media_type=media_type,
            headers={
                "Content-Disposition": f'attachment; filename="{download_filename}"',
                "Access-Control-Expose-Headers": "Content-Disposition"
            }
        )
    except Exception as e:
        logger.error(f"Download error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to download video: {str(e)}")

# Serve built React frontend if present (All-in-one deployment)
from fastapi.staticfiles import StaticFiles

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST = os.path.join(os.path.dirname(BASE_DIR), "frontend", "dist")
if not os.path.exists(FRONTEND_DIST):
    # Docker or relative fallback
    FRONTEND_DIST = os.path.join(BASE_DIR, "dist")

if os.path.exists(FRONTEND_DIST):
    # Mount assets folder
    assets_dir = os.path.join(FRONTEND_DIST, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    # Mount images folder if present
    images_dir = os.path.join(FRONTEND_DIST, "images")
    if os.path.exists(images_dir):
        app.mount("/images", StaticFiles(directory=images_dir), name="images")

    @app.get("/")
    async def serve_root():
        return FileResponse(os.path.join(FRONTEND_DIST, "index.html"))

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Don't intercept API routes
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API endpoint not found")
        file_path = os.path.join(FRONTEND_DIST, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(FRONTEND_DIST, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

