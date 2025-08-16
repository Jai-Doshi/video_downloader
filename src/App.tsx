import React, { useState, useEffect } from 'react';
import { Download, Link, Sparkles, RefreshCw } from 'lucide-react';
import VideoInfo from './components/VideoInfo';
import ProgressBar from './components/ProgressBar';
import Toast from './components/Toast';
import { useVideoDownloader } from './hooks/useVideoDownloader';

function App() {
  const [url, setUrl] = useState('');
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const {
    videoData,
    isLoading,
    progress,
    isDownloading,
    error,
    fetchVideoInfo,
    downloadVideo,
    resetState,
  } = useVideoDownloader('http://127.0.0.1:8000');

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
    }
  }, [error]);

  useEffect(() => {
    if (progress === 100 && !isDownloading && videoData) {
      showToast('Video downloaded successfully!', 'success');
    }
  }, [progress, isDownloading, videoData]);

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      showToast('Please enter a valid URL', 'warning');
      return;
    }
    await fetchVideoInfo(url);
  };

  const handleDownload = async () => {
    await downloadVideo();
  };

  const handleReset = () => {
    setUrl('');
    resetState();
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/10 to-pink-600/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center py-8 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
              <Download className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
              Video Downloader Pro
            </h1>
            <Sparkles className="h-6 w-6 text-cyan-400 animate-pulse" />
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            AI-powered video downloader with beautiful design and seamless experience
          </p>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* URL Input Section */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste your video URL here..."
                    className="
                      w-full pl-12 pr-4 py-4 rounded-xl
                      backdrop-blur-md bg-slate-800/50 border border-slate-700/50
                      text-white placeholder-slate-400
                      focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
                      transition-all duration-200
                    "
                    disabled={isLoading}
                  />
                  {url && (
                    <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${
                      isValidUrl(url) ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isLoading || !url.trim()}
                    className="
                      flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                      bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700
                      text-white font-semibold transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                      shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40
                      transform hover:scale-[1.02] active:scale-[0.98]
                    "
                  >
                    {isLoading ? (
                      <RefreshCw className="h-5 w-5 animate-spin" />
                    ) : (
                      <Download className="h-5 w-5" />
                    )}
                    {isLoading ? 'Fetching Info...' : 'Get Video Info'}
                  </button>

                  {videoData && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="
                        px-6 py-3 rounded-xl
                        backdrop-blur-md bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50
                        text-slate-200 font-semibold transition-all duration-200
                        shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]
                      "
                    >
                      Reset
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Video Info Section */}
            {videoData && (
              <VideoInfo
                videoData={videoData}
                onDownload={handleDownload}
                isDownloading={isDownloading}
              />
            )}

            {/* Progress Section */}
            {(isDownloading || progress > 0) && (
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 shadow-2xl">
                <ProgressBar
                  progress={progress}
                  isActive={isDownloading}
                />
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 px-4">
          <p className="text-slate-400 text-sm">
            Powered by AI • Made with ❤️ for the modern web
          </p>
        </footer>
      </div>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;