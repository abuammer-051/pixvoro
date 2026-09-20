import os
import re
import uuid
import logging
import subprocess
from typing import Dict, Any, List, Optional
import yt_dlp
import json

try:
    from yt_dlp.extractor.pinterest import PinterestIE
    from curl_cffi import requests as c_requests

    def _patched_pinterest_call_api(self, resource, video_id, options):
        hosts = ['au.pinterest.com', 'mx.pinterest.com', 'br.pinterest.com']
        params = {'data': json.dumps({'options': options})}
        headers = {
            'X-Pinterest-PWS-Handler': 'www/[username].js',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/javascript, */*, q=0.01',
            'Accept-Language': 'en-US,en;q=0.9',
        }

        # 1. Try curl_cffi with chrome120 impersonation
        for host in hosts:
            try:
                url = f'https://{host}/resource/{resource}Resource/get/'
                r = c_requests.get(url, params=params, headers=headers, impersonate='chrome120', timeout=8)
                if r.status_code == 200:
                    data = r.json()
                    if 'resource_response' in data and data['resource_response'].get('data'):
                        return data['resource_response']
            except Exception as e:
                logger.warning(f"curl_cffi fetch failed for Pinterest mirror {host}: {e}")
                continue

        # 2. Fallback to Windows SChannel curl.exe
        import urllib.parse
        encoded_data = urllib.parse.quote(json.dumps({'options': options}))
        for host in hosts:
            try:
                curl_url = f'https://{host}/resource/{resource}Resource/get/?data={encoded_data}'
                res = subprocess.run([
                    'curl.exe', '-s', '--max-time', '8', curl_url,
                    '-H', 'X-Pinterest-PWS-Handler: www/[username].js',
                    '-H', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
                ], capture_output=True, text=True, errors='ignore')
                if res.returncode == 0 and res.stdout.strip():
                    data = json.loads(res.stdout)
                    if 'resource_response' in data and data['resource_response'].get('data'):
                        return data['resource_response']
            except Exception as e:
                logger.warning(f"curl fallback failed for {host}: {e}")
                continue

        raise ValueError(f"Unable to fetch Pinterest metadata for pin {video_id} (Pin may be private or deleted)")

    PinterestIE._call_api = _patched_pinterest_call_api
except Exception as e:
    logger.warning(f"Could not monkeypatch PinterestIE: {e}")

logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMP_DOWNLOAD_DIR = os.path.join(BASE_DIR, "temp_downloads")
os.makedirs(TEMP_DOWNLOAD_DIR, exist_ok=True)

# Cookie handling for datacenter IPs (e.g. Render/AWS/GCP)
YOUTUBE_COOKIES_FILE = os.getenv("YOUTUBE_COOKIES_FILE", "/etc/secrets/youtube_cookies.txt")
YOUTUBE_RUNTIME_COOKIES = os.path.join(TEMP_DOWNLOAD_DIR, ".youtube_cookies.txt")

# Check raw cookie environment variable
cookies_env = os.environ.get("YOUTUBE_COOKIES")
if cookies_env:
    try:
        with open(YOUTUBE_RUNTIME_COOKIES, "w", encoding="utf-8") as f:
            f.write(cookies_env)
        logger.info("Loaded YouTube cookies from YOUTUBE_COOKIES environment variable.")
    except Exception as e:
        logger.warning(f"Failed to write cookies from env var: {e}")

COMMON_YDL_OPTS = {
    'quiet': True,
    'no_warnings': True,
    'noplaylist': True,
    'js_runtimes': {'node': {}},
    'remote_components': {'ejs:github': {}},
    'extractor_args': {
        'youtube': {
            'player_client': ['visionos', 'android'],
            'player_skip': ['webpage', 'configs'],
        },
        'youtubepot-bgutilscript': {
            'server_home': '/opt/bgutil-ytdlp-pot-provider/server'
        },
        'tiktok': {
            'app_version': ['20.2.1'],
            'manifest_app_version': ['221']
        }
    },
    'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    }
}

def youtube_opts(url: str, opts: Dict[str, Any], fallback: bool = False) -> Dict[str, Any]:
    if "youtube.com" not in url.lower() and "youtu.be" not in url.lower():
        return opts
    if os.path.isfile(YOUTUBE_COOKIES_FILE):
        try:
            if (not os.path.isfile(YOUTUBE_RUNTIME_COOKIES)
                    or os.path.getmtime(YOUTUBE_RUNTIME_COOKIES) < os.path.getmtime(YOUTUBE_COOKIES_FILE)):
                import shutil
                shutil.copyfile(YOUTUBE_COOKIES_FILE, YOUTUBE_RUNTIME_COOKIES)
            opts["cookiefile"] = YOUTUBE_RUNTIME_COOKIES
        except OSError as exc:
            logger.warning("Unable to prepare YouTube cookies: %s", exc)
    elif os.path.isfile(YOUTUBE_RUNTIME_COOKIES) and os.path.getsize(YOUTUBE_RUNTIME_COOKIES) > 0:
        opts["cookiefile"] = YOUTUBE_RUNTIME_COOKIES

    proxy = os.getenv("YOUTUBE_PROXY")
    if proxy:
        opts["proxy"] = proxy
    if fallback:
        opts.setdefault("extractor_args", {})["youtube"] = {
            "player_client": ["android"],
            "player_skip": ["webpage", "configs"]
        }
    return opts

def extract_info_with_youtube_fallback(url: str, opts: Dict[str, Any], download: bool = False):
    try:
        with yt_dlp.YoutubeDL(youtube_opts(url, dict(opts))) as ydl:
            return ydl.extract_info(url, download=download), ydl
    except Exception as e:
        if "youtube.com" not in url.lower() and "youtu.be" not in url.lower():
            raise
        logger.warning(f"Primary YouTube extraction failed: {e}. Retrying with android fallback...")
        fallback_opts = youtube_opts(url, dict(opts), fallback=True)
        if download and not fallback_opts.get('postprocessors'):
            fallback_opts['format'] = "bestvideo+bestaudio/best"
        elif download and fallback_opts.get('postprocessors'):
            fallback_opts['format'] = "bestaudio/best"
        with yt_dlp.YoutubeDL(fallback_opts) as ydl:
            return ydl.extract_info(url, download=download), ydl

def sanitize_filename(name: str) -> str:
    """Sanitize filename to prevent directory traversal or invalid Windows/Linux characters."""
    clean = re.sub(r'[\\/*?:"<>|#%&{}\\<>*?/$!\'":@+`|=]', "", name)
    clean = clean.encode('ascii', 'ignore').decode('ascii')
    clean = re.sub(r'\s+', " ", clean).strip()
    return clean[:100] if clean else "video_download"

def detect_platform(url: str) -> str:
    """Detect social video platform from URL."""
    url_lower = url.lower()
    if "youtube.com" in url_lower or "youtu.be" in url_lower:
        return "youtube"
    elif "instagram.com" in url_lower:
        return "instagram"
    elif "pinterest.com" in url_lower or "pin.it" in url_lower:
        return "pinterest"
    elif "facebook.com" in url_lower or "fb.watch" in url_lower or "fb.com" in url_lower:
        return "facebook"
    elif "tiktok.com" in url_lower:
        return "tiktok"
    elif "twitter.com" in url_lower or "x.com" in url_lower:
        return "twitter"
    return "generic"

def format_duration(seconds: Optional[int]) -> str:
    """Convert seconds into MM:SS or HH:MM:SS format."""
    if not seconds:
        return "--:--"
    m, s = divmod(int(seconds), 60)
    h, m = divmod(m, 60)
    if h > 0:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"

def format_filesize(bytes_val: Optional[float]) -> str:
    """Format file size into human readable string."""
    if not bytes_val or bytes_val <= 0:
        return "~"
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes_val < 1024.0:
            return f"{bytes_val:.1f} {unit}"
        bytes_val /= 1024.0
    return f"{bytes_val:.1f} TB"

def normalize_url(url: str) -> str:
    """
    Normalize and resolve shortened/blocked links:
    - Resolves Pinterest pin.it mobile links via api.pinterest.com redirect
    - Routes pinterest.com pins through in.pinterest.com to bypass local ISP SNI resets
    - Resolves TikTok vm.tiktok.com / vt.tiktok.com short links
    """
    url = url.strip()
    
    # 1. Pinterest short links (pin.it)
    if "pin.it" in url.lower():
        m = re.search(r'pin\.it/([a-zA-Z0-9_-]+)', url)
        if m:
            short_code = m.group(1)
            target = f"https://api.pinterest.com/url_shortener/{short_code}/redirect/"
            try:
                proc = subprocess.run(['curl.exe', '-s', '-I', '--max-time', '8', target], capture_output=True, text=True, errors='ignore', timeout=10)
                loc_match = re.search(r'(?i)location:\s*([^\r\n]+)', proc.stdout)
                if loc_match:
                    loc = loc_match.group(1).strip()
                    pin_match = re.search(r'/pin/(\d+)', loc)
                    if pin_match:
                        return f"https://au.pinterest.com/pin/{pin_match.group(1)}/"
            except Exception as e:
                logger.warning(f"Error resolving pin.it via api.pinterest.com: {e}")

            # Fallback: resolve via http://pin.it
            try:
                proc = subprocess.run(['curl.exe', '-s', '-I', '--max-time', '8', f"http://pin.it/{short_code}"], capture_output=True, text=True, errors='ignore', timeout=10)
                loc_match = re.search(r'(?i)location:\s*([^\r\n]+)', proc.stdout)
                if loc_match:
                    loc = loc_match.group(1).strip()
                    # Follow the redirect to get the pin id
                    proc2 = subprocess.run(['curl.exe', '-s', '-I', '--max-time', '8', loc], capture_output=True, text=True, errors='ignore', timeout=10)
                    loc2_match = re.search(r'(?i)location:\s*([^\r\n]+)', proc2.stdout)
                    if loc2_match:
                        pin_match = re.search(r'/pin/(\d+)', loc2_match.group(1).strip())
                        if pin_match:
                            return f"https://au.pinterest.com/pin/{pin_match.group(1)}/"
            except Exception as e:
                logger.warning(f"Error resolving http://pin.it: {e}")
                
    # 2. Pinterest standard pins (bypass ISP firewall SNI blocking on www.pinterest.com)
    if "pinterest." in url.lower():
        pin_match = re.search(r'pinterest\.[a-z.]+/pin/(\d+)', url)
        if pin_match:
            return f"https://au.pinterest.com/pin/{pin_match.group(1)}/"

    # 3. TikTok shortened links (vm.tiktok.com, vt.tiktok.com, /t/)
    if any(k in url.lower() for k in ["vm.tiktok.com", "vt.tiktok.com", "tiktok.com/t/"]):
        try:
            proc = subprocess.run(['curl.exe', '-s', '-I', '--max-time', '10', url], capture_output=True, text=True, errors='ignore', timeout=12)
            locs = re.findall(r'(?i)location:\s*([^\r\n]+)', proc.stdout)
            if locs:
                return locs[-1].strip()
        except Exception as e:
            logger.warning(f"Error resolving TikTok shortened link: {e}")

    return url

def get_video_info(url: str) -> Dict[str, Any]:
    """
    Extract video information and standardized download options using yt-dlp.
    """
    url = normalize_url(url)
    ydl_opts = dict(COMMON_YDL_OPTS)
    ydl_opts['skip_download'] = True
    ydl_opts['extract_flat'] = False

    try:
        info, _ = extract_info_with_youtube_fallback(url, ydl_opts, download=False)
    except Exception as e:
        logger.error(f"Error extracting info for {url}: {str(e)}")
        # If it's YouTube, retry with dedicated android client fallback
        if "youtube.com" in url.lower() or "youtu.be" in url.lower():
            try:
                fallback_opts = dict(ydl_opts)
                fallback_opts['extractor_args'] = {
                    'youtube': {
                        'player_client': ['android'],
                        'player_skip': ['webpage', 'configs']
                    }
                }
                with yt_dlp.YoutubeDL(fallback_opts) as ydl:
                    info = ydl.extract_info(url, download=False)
            except Exception as e2:
                logger.error(f"YouTube fallback extraction failed: {str(e2)}")
                raise ValueError(f"Unable to fetch video information: {str(e)}")
        else:
            raise ValueError(f"Unable to fetch video information: {str(e)}")

    if not info:
        raise ValueError("No video information found for this URL.")

    # Determine available video qualities
    raw_formats = info.get('formats', [])
    available_heights = set()
    for f in raw_formats:
        h = f.get('height')
        if h and isinstance(h, int):
            available_heights.add(h)

    max_height = max(available_heights) if available_heights else 720
    platform = detect_platform(url)

    # Standard video options
    video_options = []
    
    # 4K UHD 2160p
    if max_height >= 2160:
        video_options.append({
            "id": "2160p",
            "format_spec": "bestvideo[height<=2160]+bestaudio/best[height<=2160]/best",
            "quality": "2160p (4K UHD)",
            "label": "4K Ultra HD",
            "ext": "mp4",
            "is_audio": False,
            "badge": "4K UHD",
            "color": "emerald",
            "approx_size": format_filesize(info.get('filesize') or info.get('filesize_approx'))
        })

    # 1440p 2K
    if max_height >= 1440:
        video_options.append({
            "id": "1440p",
            "format_spec": "bestvideo[height<=1440]+bestaudio/best[height<=1440]/best",
            "quality": "1440p (2K QHD)",
            "label": "2K Quad HD",
            "ext": "mp4",
            "is_audio": False,
            "badge": "2K QHD",
            "color": "cyan",
            "approx_size": format_filesize((info.get('filesize') or info.get('filesize_approx') or 0) * 0.7 if (info.get('filesize') or info.get('filesize_approx')) else None)
        })

    # 1080p Full HD
    if max_height >= 1080 or platform in ["youtube", "facebook"]:
        video_options.append({
            "id": "1080p",
            "format_spec": "bestvideo[height<=1080]+bestaudio/best[height<=1080]/best",
            "quality": "1080p (Full HD)",
            "label": "Full HD 1080p",
            "ext": "mp4",
            "is_audio": False,
            "badge": "1080p HD",
            "color": "sky",
            "approx_size": format_filesize((info.get('filesize') or info.get('filesize_approx') or 0) * 0.5 if (info.get('filesize') or info.get('filesize_approx')) else None)
        })

    # 720p HD
    video_options.append({
        "id": "720p",
        "format_spec": "bestvideo[height<=720]+bestaudio/best[height<=720]/best",
        "quality": "720p (HD)",
        "label": "HD 720p",
        "ext": "mp4",
        "is_audio": False,
        "badge": "720p",
        "color": "indigo",
        "approx_size": format_filesize((info.get('filesize') or info.get('filesize_approx') or 0) * 0.35 if (info.get('filesize') or info.get('filesize_approx')) else None)
    })

    # 480p SD
    video_options.append({
        "id": "480p",
        "format_spec": "bestvideo[height<=480]+bestaudio/best[height<=480]/best",
        "quality": "480p (SD)",
        "label": "SD 480p",
        "ext": "mp4",
        "is_audio": False,
        "badge": "480p",
        "color": "violet",
        "approx_size": format_filesize((info.get('filesize') or info.get('filesize_approx') or 0) * 0.2 if (info.get('filesize') or info.get('filesize_approx')) else None)
    })

    # 360p Fast Mobile
    video_options.append({
        "id": "360p",
        "format_spec": "bestvideo[height<=360]+bestaudio/best[height<=360]/best",
        "quality": "360p (Fast)",
        "label": "Mobile 360p",
        "ext": "mp4",
        "is_audio": False,
        "badge": "360p",
        "color": "purple",
        "approx_size": format_filesize((info.get('filesize') or info.get('filesize_approx') or 0) * 0.12 if (info.get('filesize') or info.get('filesize_approx')) else None)
    })

    # If no video stream formats found (e.g., Pinterest Image pin), provide original image download
    if not video_options and (info.get('thumbnail') or info.get('thumbnails')):
        video_options.append({
            "id": "image_orig",
            "format_spec": "image",
            "quality": "HD Original Image",
            "label": "Original Image (High Res)",
            "ext": "jpg",
            "is_audio": False,
            "badge": "HD JPG",
            "color": "rose",
            "approx_size": "Original"
        })

    # Audio options
    duration = info.get('duration') or 180
    audio_options = [
        {
            "id": "mp3_320",
            "format_spec": "bestaudio/best",
            "quality": "320 kbps (Studio HQ)",
            "label": "High Quality MP3",
            "ext": "mp3",
            "is_audio": True,
            "badge": "320k HQ",
            "color": "amber",
            "approx_size": format_filesize(duration * 320 * 1024 / 8)
        },
        {
            "id": "mp3_128",
            "format_spec": "bestaudio/best",
            "quality": "128 kbps (Standard)",
            "label": "Standard MP3",
            "ext": "mp3",
            "is_audio": True,
            "badge": "128k MP3",
            "color": "orange",
            "approx_size": format_filesize(duration * 128 * 1024 / 8)
        },
        {
            "id": "m4a",
            "format_spec": "bestaudio[ext=m4a]/bestaudio/best",
            "quality": "Original Audio (M4A)",
            "label": "Original M4A",
            "ext": "m4a",
            "is_audio": True,
            "badge": "M4A",
            "color": "rose",
            "approx_size": format_filesize(duration * 160 * 1024 / 8)
        }
    ]

    return {
        "title": info.get("title") or "Video",
        "thumbnail": info.get("thumbnail"),
        "duration": info.get("duration"),
        "duration_str": format_duration(info.get("duration")),
        "uploader": info.get("uploader") or info.get("channel") or info.get("creator") or "Social Creator",
        "view_count": info.get("view_count"),
        "platform": platform,
        "original_url": url,
        "video_options": video_options,
        "audio_options": audio_options
    }

def download_video_file(url: str, format_id: str, is_audio: bool = False) -> tuple[str, str]:
    """
    Downloads the requested format and returns (filepath, filename).
    """
    url = normalize_url(url)
    file_token = str(uuid.uuid4())[:8]
    ext = "mp3" if is_audio else "mp4"
    if format_id == "m4a":
        ext = "m4a"
    elif format_id == "image_orig":
        ext = "jpg"

    # Clean local disk template without emoji or special characters to ensure Windows compatibility
    output_tmpl = os.path.join(TEMP_DOWNLOAD_DIR, f"{file_token}.%(ext)s")

    # Handle image-only pins
    if format_id == "image_orig":
        ydl_opts = dict(COMMON_YDL_OPTS)
        ydl_opts['skip_download'] = True
        info, _ = extract_info_with_youtube_fallback(url, ydl_opts, download=False)
        img_url = info.get('thumbnail')
        if not img_url and info.get('thumbnails'):
            img_url = info['thumbnails'][-1].get('url')
        if not img_url:
            raise ValueError("No image found for this pin")
        target_path = os.path.join(TEMP_DOWNLOAD_DIR, f"{file_token}.jpg")
        proc = subprocess.run(['curl.exe', '-s', '-L', '--max-time', '15', img_url, '-o', target_path], capture_output=True)
        if not os.path.exists(target_path) or os.path.getsize(target_path) == 0:
            raise ValueError("Failed to download Pinterest image file")
        title = info.get("title", "pinterest_image") or "pinterest_image"
        safe_title = sanitize_filename(title)
        return target_path, f"{safe_title}.jpg"

    format_spec = "bestvideo+bestaudio/best"
    if format_id == "2160p":
        format_spec = "bestvideo[height<=2160]+bestaudio/best[height<=2160]/best"
    elif format_id == "1440p":
        format_spec = "bestvideo[height<=1440]+bestaudio/best[height<=1440]/best"
    elif format_id == "1080p":
        format_spec = "bestvideo[height<=1080]+bestaudio/best[height<=1080]/best"
    elif format_id == "720p":
        format_spec = "bestvideo[height<=720]+bestaudio/best[height<=720]/best"
    elif format_id == "480p":
        format_spec = "bestvideo[height<=480]+bestaudio/best[height<=480]/best"
    elif format_id == "360p":
        format_spec = "bestvideo[height<=360]+bestaudio/best[height<=360]/best"
    elif is_audio or format_id.startswith("mp3"):
        format_spec = "bestaudio/best"

    ydl_opts = dict(COMMON_YDL_OPTS)
    ydl_opts['outtmpl'] = output_tmpl
    ydl_opts['format'] = format_spec

    if is_audio and format_id != "m4a":
        ydl_opts['postprocessors'] = [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '320' if '320' in format_id else '128',
        }]
    elif not is_audio:
        ydl_opts['merge_output_format'] = 'mp4'

    info, ydl = extract_info_with_youtube_fallback(url, ydl_opts, download=True)
    filename = ydl.prepare_filename(info)

    if is_audio and format_id != "m4a" and not filename.endswith('.mp3'):
        base, _ = os.path.splitext(filename)
        filename = f"{base}.mp3"
    elif not is_audio and not filename.endswith('.mp4'):
        base, _ = os.path.splitext(filename)
        if os.path.exists(f"{base}.mp4"):
            filename = f"{base}.mp4"

    if not os.path.exists(filename):
        for f in os.listdir(TEMP_DOWNLOAD_DIR):
            if f.startswith(file_token):
                filename = os.path.join(TEMP_DOWNLOAD_DIR, f)
                break

    if not os.path.exists(filename):
        raise FileNotFoundError(f"Downloaded file not found on server for token {file_token}")

    title = info.get("title", "download") or "download"
    safe_title = sanitize_filename(title)
    download_filename = f"{safe_title}.{ext}"

    return filename, download_filename
