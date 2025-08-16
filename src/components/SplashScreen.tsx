import React, { useEffect, useState } from 'react';
import { Download, Sparkles, Play, Zap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Initializing AI Engine...",
    "Loading Video Processors...",
    "Connecting to Networks...",
    "Ready to Download!"
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full animate-pulse">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-cyan-400 to-blue-600 rounded-sm"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animation: `fadeInOut 3s infinite ${i * 0.05}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 px-6">
        {/* Logo Section */}
        <div className="relative">
          {/* Glassmorphism Container */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/20">
            {/* Animated Logo */}
            <div className="relative mb-6">
              <div className="flex items-center justify-center">
                {/* Main Logo */}
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 animate-bounce">
                  <Download className="h-12 w-12 text-white" />
                  
                  {/* Floating Icons */}
                  <div className="absolute -top-2 -right-2 p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 animate-spin" style={{ animationDuration: '3s' }}>
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 p-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 animate-pulse">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -top-2 -left-2 p-2 rounded-full bg-gradient-to-br from-orange-500 to-red-600 animate-ping">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Ripple Effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-2 border-cyan-400/30 rounded-full animate-ping"></div>
                <div className="absolute w-32 h-32 border-2 border-blue-400/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute w-40 h-40 border-2 border-purple-400/10 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent mb-2">
              Video Downloader Pro
            </h1>
            <p className="text-slate-300 text-lg mb-6">
              AI-Powered • Lightning Fast • Modern Design
            </p>

            {/* Loading Text */}
            <div className="h-6 mb-6">
              <p className="text-cyan-400 font-medium animate-pulse">
                {loadingTexts[currentText]}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Loading</span>
                <span className="text-sm text-cyan-400 font-semibold">{Math.round(progress)}%</span>
              </div>
              
              <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition-all duration-300 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {['High Quality', 'Multiple Formats', 'Fast Download', 'AI Powered'].map((feature, index) => (
            <div
              key={feature}
              className="px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-sm text-slate-200 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;