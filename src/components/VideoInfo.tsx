import React from 'react';
import { ExternalLink, Download, Clock, Eye } from 'lucide-react';

interface VideoInfoProps {
  videoData: {
    title: string;
    thumbnail: string;
    sourceName: string;
    sourceLogo: string;
    duration?: string;
    views?: string;
    description?: string;
    url: string;
  };
  onDownload: () => void;
  isDownloading: boolean;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ 
  videoData, 
  onDownload, 
  isDownloading 
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="
        backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10
        shadow-2xl shadow-black/20 overflow-hidden
        transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl
      ">
        {/* Thumbnail Section */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={videoData.thumbnail}
            alt={videoData.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800') {
                target.src = 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800';
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Source Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/20">
            <img
              src={videoData.sourceLogo}
              alt={videoData.sourceName}
              className="w-5 h-5 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=40') {
                  target.src = 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=40';
                } else {
                  target.style.display = 'none';
                }
              }}
            />
            <span className="text-white text-sm font-medium">{videoData.sourceName}</span>
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-4 right-4 flex items-center gap-4">
            {videoData.duration && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-md bg-black/60">
                <Clock className="h-3 w-3 text-white" />
                <span className="text-white text-xs font-medium">{videoData.duration}</span>
              </div>
            )}
            {videoData.views && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-md bg-black/60">
                <Eye className="h-3 w-3 text-white" />
                <span className="text-white text-xs font-medium">{videoData.views}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-white leading-tight mb-2 line-clamp-2">
              {videoData.title}
            </h2>
            {videoData.description && (
              <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
                {videoData.description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onDownload}
              disabled={isDownloading}
              className="
                flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700
                text-white font-semibold transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40
                transform hover:scale-[1.02] active:scale-[0.98]
              "
            >
              <Download className={`h-5 w-5 ${isDownloading ? 'animate-bounce' : ''}`} />
              {isDownloading ? 'Downloading...' : 'Download Video'}
            </button>
            
            <a
              href={videoData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20
                text-white font-semibold transition-all duration-200
                shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]
              "
            >
              <ExternalLink className="h-5 w-5" />
              View Original
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;