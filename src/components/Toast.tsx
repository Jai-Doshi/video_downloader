import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 4000 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle
  };

  const colors = {
    success: 'from-emerald-500 to-green-600',
    error: 'from-red-500 to-rose-600', 
    warning: 'from-amber-500 to-orange-600'
  };

  const Icon = icons[type];

  return (
    <div className={`fixed top-6 right-6 z-50 transform transition-all duration-300 ${
      isVisible 
        ? 'translate-x-0 opacity-100 scale-100' 
        : 'translate-x-full opacity-0 scale-95'
    }`}>
      <div className={`
        flex items-center gap-3 px-6 py-4 rounded-xl
        backdrop-blur-xl bg-white/10 border border-white/20
        shadow-2xl shadow-black/20
        bg-gradient-to-r ${colors[type]}
        min-w-[320px] max-w-md
      `}>
        <Icon className="h-6 w-6 text-white flex-shrink-0" />
        <p className="text-white font-medium leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto text-white/80 hover:text-white transition-colors p-1"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;