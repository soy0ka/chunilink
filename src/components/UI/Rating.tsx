'use client';
import React from 'react';

type RatingBoxProps = {
  rating: number;
  animate?: boolean;
};

const getColorConfig = (value: number) => {
  if (value < 4) return { 
    color: '#24F117', 
    label: '그린',
    gradient: 'linear-gradient(135deg, rgba(36,241,23,0.25) 0%, rgba(36,241,23,0.1) 100%)',
    shadow: '0 10px 25px -5px rgba(36,241,23,0.3), 0 8px 10px -6px rgba(0,0,0,0.1)',
    border: 'rgba(36,241,23,0.5)',
    textColor: 'text-green-800 dark:text-green-200'
  };
  if (value < 7) return { 
    color: '#FAB90A', 
    label: '오렌지',
    gradient: 'linear-gradient(135deg, rgba(250,185,10,0.25) 0%, rgba(250,185,10,0.1) 100%)',
    shadow: '0 10px 25px -5px rgba(250,185,10,0.3), 0 8px 10px -6px rgba(0,0,0,0.1)',
    border: 'rgba(250,185,10,0.5)',
    textColor: 'text-amber-800 dark:text-amber-200'
  };
  if (value < 10) return { 
    color: '#F75166', 
    label: '레드',
    gradient: 'linear-gradient(135deg, rgba(247,81,102,0.25) 0%, rgba(247,81,102,0.1) 100%)',
    shadow: '0 10px 25px -5px rgba(247,81,102,0.3), 0 8px 10px -6px rgba(0,0,0,0.1)',
    border: 'rgba(247,81,102,0.5)',
    textColor: 'text-red-800 dark:text-red-200'
  };
  if (value < 12) return { 
    color: '#EC56E5', 
    label: '퍼플',
    gradient: 'linear-gradient(135deg, rgba(236,86,229,0.25) 0%, rgba(236,86,229,0.1) 100%)',
    shadow: '0 10px 25px -5px rgba(236,86,229,0.3), 0 8px 10px -6px rgba(0,0,0,0.1)',
    border: 'rgba(236,86,229,0.5)',
    textColor: 'text-purple-800 dark:text-purple-200'
  };
  if (value < 13.25) return { 
    color: '#CD7F32', 
    label: '브론즈',
    gradient: 'linear-gradient(135deg, rgba(205,127,50,0.25) 0%, rgba(205,127,50,0.1) 100%)',
    shadow: '0 10px 25px -5px rgba(205,127,50,0.3), 0 8px 10px -6px rgba(0,0,0,0.1)',
    border: 'rgba(205,127,50,0.5)',
    textColor: 'text-amber-800 dark:text-amber-200'
  };
  if (value < 14.5) return { 
    color: '#C0C0C0', 
    label: '실버',
    gradient: 'linear-gradient(135deg, rgba(192,192,192,0.25) 0%, rgba(192,192,192,0.1) 100%)',
    shadow: '0 10px 25px -5px rgba(192,192,192,0.3), 0 8px 10px -6px rgba(0,0,0,0.1)',
    border: 'rgba(192,192,192,0.5)',
    textColor: 'text-gray-800 dark:text-gray-200'
  };
  if (value < 15.25) return { 
    color: '#FFD700', 
    label: '골드',
    gradient: 'linear-gradient(135deg, rgba(255,215,0,0.35) 0%, rgba(255,215,0,0.15) 100%)',
    shadow: '0 10px 25px -5px rgba(255,215,0,0.4), 0 8px 10px -6px rgba(0,0,0,0.1)',
    border: 'rgba(255,215,0,0.6)',
    textColor: 'text-amber-800 dark:text-amber-200'
  };
  if (value < 16) return { 
    color: '#E6D485', 
    label: '백금',
    gradient: 'linear-gradient(135deg, #F2F2DA 0%, #FFFC9F 100%)',
    shadow: '0 10px 25px -5px rgba(230,212,133,0.4), 0 8px 10px -6px rgba(0,0,0,0.1)',
    border: 'rgba(230,212,133,0.6)',
    textColor: 'text-amber-700 dark:text-amber-700'
  };
  if (value < 17) return { 
    color: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)', 
    label: '무지개',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
    shadow: '0 10px 25px -5px rgba(255,105,180,0.3), 0 8px 10px -6px rgba(0,0,0,0.1)',
    border: 'rgba(255,105,180,0.5)',
    textColor: 'text-pink-800 dark:text-pink-200'
  };
  return { 
    color: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)', 
    label: '무지개 (극)',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 100%)',
    shadow: '0 10px 25px -5px rgba(255,255,255,0.4), 0 8px 10px -6px rgba(0,0,0,0.1)',
    border: 'rgba(255,255,255,0.6)',
    textColor: 'text-pink-800 dark:text-pink-200'
  };
};

const RatingBox: React.FC<RatingBoxProps> = ({ rating, animate = false }) => {
  const colorConfig = getColorConfig(rating);
  const isRainbow = rating >= 16;

  const shimmerStyle = {
    animation: 'shimmer 2s infinite linear',
    background: isRainbow ? 
      'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)' : 
      'none',
    WebkitBackgroundClip: isRainbow ? 'text' : 'none',
    backgroundClip: isRainbow ? 'text' : 'none',
    color: isRainbow ? 'transparent' : colorConfig.color,
    textShadow: isRainbow ? '0 0 10px rgba(255,255,255,0.5)' : '0 0 5px rgba(0,0,0,0.15)'
  } as React.CSSProperties;

  return (
    <div className="relative">
      <div 
        className={`px-6 py-3 rounded-xl border shadow-lg transition-all duration-300 ${animate ? 'scale-110' : 'scale-100'}`}
        style={{
          background: colorConfig.gradient,
          boxShadow: colorConfig.shadow,
          borderColor: colorConfig.border,
          backdropFilter: "blur(12px)",
          minWidth: "140px",
          textAlign: "center",
        }}
      >
        <div className={`text-xs uppercase tracking-widest font-medium mb-1 ${colorConfig.textColor} opacity-80`}>
          {colorConfig.label}
        </div>
        <div 
          className={`text-4xl font-extrabold tracking-widest transition-all duration-300 ${animate ? 'scale-125' : 'scale-100'}`}
          style={shimmerStyle}
        >
          {rating.toFixed(2)}
        </div>
      </div>
      {isRainbow && (
        <div className="absolute -inset-1 bg-opacity-30 blur-sm rounded-xl animate-pulse"
          style={{
            background: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            zIndex: -1
          }}>
        </div>
      )}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default RatingBox;
