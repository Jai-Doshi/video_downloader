import { useState, useCallback } from 'react';

interface VideoData {
  title: string;
  thumbnail: string;
  sourceName: string;
  sourceLogo: string;
  duration?: string;
  views?: string;
  description?: string;
  url: string;
}

interface UseVideoDownloaderReturn {
  videoData: VideoData | null;
  isLoading: boolean;
  progress: number;
  isDownloading: boolean;
  error: string | null;
  fetchVideoInfo: (url: string) => Promise<void>;
  downloadVideo: () => Promise<void>;
  resetState: () => void;
}

export const useVideoDownloader = (apiBaseUrl: string = 'https://jai14-videodownloader.hf.space'): UseVideoDownloaderReturn => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideoInfo = useCallback(async (url: string) => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${apiBaseUrl}/video-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch video info: ${response.statusText}`);
      }

      const data = await response.json();
      setVideoData({
        title: data.title || 'Unknown Title',
        thumbnail: data.thumbnail || 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
        sourceName: data.sourceName || 'Unknown Source',
        sourceLogo: data.sourceLogo || 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=40',
        duration: data.duration,
        views: data.views ? `${data.views} views` : undefined,
        description: data.description,
        url: url,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video information');
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl]);

  const downloadVideo = useCallback(async () => {
    if (!videoData) return;

    setIsDownloading(true);
    setProgress(0);
    setError(null);

    try {
      // Start download request
      const response = await fetch(`${apiBaseUrl}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoData.url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Download failed: ${response.statusText}`);
      }

      // Simulate progress since the API doesn't provide real-time progress
      // In a real implementation, you might use WebSockets or polling for progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      const data = await response.json();
      
      // Clear the interval and set progress to 100%
      clearInterval(progressInterval);
      setProgress(100);

      // If the API returns a download URL, trigger the download
      if (data.downloadUrl) {
        const downloadLink = document.createElement('a');
        downloadLink.href = `${apiBaseUrl}${data.downloadUrl}`;
        downloadLink.download = videoData.title || 'video';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
      setProgress(0);
    } finally {
      setIsDownloading(false);
    }
  }, [videoData, apiBaseUrl]);

  const resetState = useCallback(() => {
    setVideoData(null);
    setIsLoading(false);
    setProgress(0);
    setIsDownloading(false);
    setError(null);
  }, []);

  return {
    videoData,
    isLoading,
    progress,
    isDownloading,
    error,
    fetchVideoInfo,
    downloadVideo,
    resetState,
  };
};