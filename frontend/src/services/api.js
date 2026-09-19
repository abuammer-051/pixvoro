const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function fetchVideoInfo(url) {
  const response = await fetch(`${API_BASE_URL}/api/info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.detail || data.error || 'Unable to retrieve video information. Please verify the URL.');
  }

  return data.data;
}

export function getDownloadUrl(url, formatId, isAudio = false) {
  const params = new URLSearchParams({
    url,
    format_id: formatId,
    is_audio: isAudio ? 'true' : 'false',
  });
  return `${API_BASE_URL}/api/download?${params.toString()}`;
}

export function triggerDownload(url, formatId, isAudio = false, filename = 'download') {
  const downloadUrl = getDownloadUrl(url, formatId, isAudio);
  
  // Direct anchor trigger so browser handles attachment download
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
