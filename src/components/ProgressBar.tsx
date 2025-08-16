import React from 'react';

interface ProgressBarProps {
  progress: number;
  isActive: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  isActive, 
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-200">
          Download Progress
        </span>
        <span className="text-sm text-cyan-400 font-semibold">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden border border-slate-700/50">
        <div 
          className={`
            h-full rounded-full transition-all duration-300 ease-out
            bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600
            relative overflow-hidden
            ${isActive ? 'animate-pulse' : ''}
          `}
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          )}
        </div>
      </div>
      
      {isActive && (
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span>Downloading...</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;