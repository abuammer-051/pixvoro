# Pixvoro Pro - High-Speed SEO Video Downloader (yt-dlp + FastAPI + React)

A full-stack, production-ready web application for downloading high-definition videos and extracting MP3 audio from **YouTube**, **Instagram**, **Pinterest**, **Facebook**, and **TikTok**. Powered by `yt-dlp` and `ffmpeg`, with tailored landing pages and JSON-LD structured data for search engine optimization (SEO).

---

## 🚀 Quick Start

### 1. Requirements
- **Python 3.10+** (Python 3.13 tested)
- **FFmpeg** (installed and in PATH)
- **Node.js 18+** (Node.js 26 tested)

### 2. Launch with One Click
Double click `start.bat` or run:
```powershell
.\start.ps1
```
Or start manually:

**Backend (FastAPI)**:
```bash
cd backend
python -m pip install -r requirements.txt
python run.py
```
- API Base URL: `http://127.0.0.1:8000`
- Interactive API Docs: `http://127.0.0.1:8000/docs`

**Frontend (React + Vite + Tailwind v4)**:
```bash
cd frontend
npm install
npm run dev
```
- Web Application: `http://localhost:5173`

---

## 🌟 Key Features

1. **Universal yt-dlp Core Engine**:
   - YouTube: Supports 4K (2160p), 2K (1440p), 1080p Full HD with synchronized sound (via automated server-side FFmpeg muxing), and YouTube Shorts.
   - Instagram: HD Reels, carousel videos, and video posts.
   - Pinterest: Video pins, Idea Pins, and animated GIFs (supports shortened `pin.it` URLs).
   - Facebook: Watch videos, Reels, and public clips in 1080p.
   - TikTok: Clean MP4 downloads without the bouncing watermark.
   - Audio Extraction: High-bitrate 320kbps and 128kbps MP3 audio conversions.

2. **Full SEO Architecture**:
   - Dedicated platform landing pages:
     - `/` - Universal All-in-One Downloader
     - `/youtube-downloader` - YouTube Video, Shorts & MP3 Converter
     - `/instagram-downloader` - Instagram Reels & Story Saver
     - `/pinterest-downloader` - Pinterest Video & GIF Saver
     - `/facebook-downloader` - Facebook Watch & Reels Downloader
     - `/tiktok-downloader` - TikTok No-Watermark Downloader
     - `/terms` & `/privacy` - Terms of Service & Privacy Policy
   - Dynamic meta tags, OpenGraph images, and canonical URLs via `react-helmet-async`.
   - Google Rich Snippets Schema (`SoftwareApplication`, `HowTo`, `FAQPage`, `BreadcrumbList`).
   - `sitemap.xml` and `robots.txt` in `frontend/public/`.

3. **Modern Frontend Aesthetics**:
   - Typography: Plus Jakarta Sans / Outfit headings paired with Inter body text.
   - Cohesive dark obsidian palette (`#070A12`) with glassmorphic cards and platform accent pills.
   - Micro-interactions: 1-click clipboard paste, auto-detection of platform from pasted link, loading shimmer skeletons.
   - Horizontal section illustrations for each core section (`hero_banner.jpg`, `how_it_works_banner.jpg`, `quality_speed_banner.jpg`, `platform_ecosystem_banner.jpg`).
