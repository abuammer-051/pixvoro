FROM python:3.11-slim

# Install system dependencies: ffmpeg, curl
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY . .

# Create temp downloads directory
RUN mkdir -p /app/temp_downloads

# Expose port (Render/Koyeb/Railway use PORT env var, defaults to 8000)
ENV PORT=8000
EXPOSE 8000

# Start FastAPI application via uvicorn
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
