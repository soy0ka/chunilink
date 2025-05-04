'use client';

interface GameStats {
  justiceCritical: number;
  justice: number;
  attack: number;
  miss: number;
  maxCombo: number;
  score: number;
  clearPercentage: number; // Represents gauge fill percentage  
}

export default function ScoreGauge({ gameStats }: { gameStats?: GameStats }) {
  // Default values if no props are passed - using values from the screenshot
  const stats = gameStats || {
    justiceCritical: 1665,
    justice: 79,
    attack: 6,
    miss: 2,
    maxCombo: 1668,
    score: 1006649,
    clearPercentage: 90 // Represents gauge fill percentage
  };

  return (
    <div 
      className="h-36 flex-1 flex flex-col justify-between"
      style={{
        backgroundImage: "url('/images/chunithm/chunithm-base.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top stats bar - 4 equal parts with centered text */}
      <div className="grid grid-cols-4 bg-black py-1 px-2">
        <div className="text-yellow-300 font-bold text-xs text-center" style={{
          textShadow: "0 0 4px rgba(255,215,0,0.8)",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0.5px"
        }}>JUSTICE CRITICAL : {stats.justiceCritical}</div>
        
        <div className="text-yellow-600 font-bold text-xs text-center" style={{
          textShadow: "0 0 4px rgba(255,215,0,0.8)",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0.5px"
        }}>JUSTICE : {stats.justice}</div>
        
        <div className="text-green-400 font-bold text-xs text-center" style={{
          textShadow: "0 0 4px rgba(0,255,0,0.8)",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0.5px"
        }}>ATTACK : {stats.attack}</div>
        
        <div className="text-gray-300 font-bold text-xs text-center" style={{
          textShadow: "0 0 4px rgba(255,255,255,0.8)",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0.5px"
        }}>MISS : {stats.miss}</div>
      </div>
      
      {/* Middle section with MAX COMBO and SCORE - centered with spacing */}
      <div className="flex justify-center items-center space-x-32">
        <div className="text-gray-800 font-black text-md" style={{
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0.5px",
          filter: "drop-shadow(0 0 1px rgba(255,255,255,1))"
        }}>
          MAX COMBO : {stats.maxCombo}
        </div>
        <div className="text-gray-800 font-black text-md" style={{
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0.5px",
          filter: "drop-shadow(0 0 1px rgba(255,255,255,1))"
        }}>
          SCORE: {stats.score.toLocaleString()}
        </div>
      </div>
      
      {/* Full-width gauge bar that breaks through the layout */}
      <div className="relative w-full" style={{ height: "84px" }}>
        <div className="absolute top-0 left-0 right-0 h-8 mx-8 border-t border-b border-black bg-black">
          <div 
            className="absolute top-0 left-0 h-full"
            style={{ 
              width: `${stats.clearPercentage}%`,
              background: "linear-gradient(to right, #FF9900, #FFCC00)",
              boxShadow: "inset 0 0 6px rgba(255,255,255,0.5)"
            }}
          ></div>
          
          <div className="absolute inset-0 flex justify-center items-center">
            <div 
              className="text-4xl font-black tracking-widest"
              style={{
                color: "#FFFF00",
                textShadow: "0 0 3px rgba(255,255,0,0.8), 0 0 6px rgba(255,200,0,0.7), -1px -1px 0 #AA7700, 1px -1px 0 #AA7700, -1px 1px 0 #AA7700, 1px 1px 0 #AA7700",
                fontFamily: "Impact, Arial Black, sans-serif",
                letterSpacing: "0.15em",
                transform: "scaleY(1.2)"
              }}
            >
              CLEAR
            </div>
          </div>
          
          {/* Vertical separator lines in the gauge */}
          <div className="absolute inset-0 flex justify-between">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-px h-full bg-black opacity-50"
                style={{ boxShadow: "0 0 1px rgba(255,255,255,0.5)" }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Bottom progress indicators/blocks - full width to match gauge bar */}
        <div className="relative flex justify-center items-bottom-0 w-full h-20">
          <div className="flex space-x-1 items-center w-10/12">
            {/* Blue blocks */}
            {[...Array(3)].map((_, i) => (
              <div key={`blue-${i}`} className="flex-1 flex flex-col items-center">
                <div className="w-full h-4 bg-blue-300 border border-gray-700" style={{ 
                  boxShadow: "0 0 1px rgba(255,255,255,0.8), inset 0 0 2px rgba(255,255,255,0.8)",
                  transform: "perspective(50px) rotateX(15deg)"
                }}></div>
                <div className="w-full h-0.5 bg-white opacity-30 mt-px"></div>
              </div>
            ))}
            
            {/* Yellow blocks */}
            {[...Array(4)].map((_, i) => (
              <div key={`yellow-${i}`} className="flex-1 flex flex-col items-center">
                <div className="w-full h-4 bg-yellow-400 border border-gray-700" style={{ 
                  boxShadow: "0 0 1px rgba(255,255,255,0.8), inset 0 0 2px rgba(255,255,255,0.8)",
                  transform: "perspective(50px) rotateX(15deg)"
                }}></div>
                <div className="w-full h-0.5 bg-white opacity-30 mt-px"></div>
              </div>
            ))}
            
            {/* Dark blocks */}
            {[...Array(4)].map((_, i) => (
              <div key={`dark-${i}`} className="flex-1 flex flex-col items-center">
                <div className="w-full h-4 bg-gray-800 border border-gray-700" style={{ 
                  boxShadow: "0 0 1px rgba(255,255,255,0.5), inset 0 0 2px rgba(100,100,100,0.8)",
                  transform: "perspective(50px) rotateX(15deg)"
                }}></div>
                <div className="w-full h-0.5 bg-white opacity-30 mt-px"></div>
              </div>
            ))}
            
            {/* Gray/disabled block */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full h-4 bg-gray-400 border border-gray-600" style={{ 
                boxShadow: "0 0 1px rgba(200,200,200,0.5), inset 0 0 2px rgba(150,150,150,0.5)",
                transform: "perspective(50px) rotateX(15deg)"
              }}></div>
              <div className="w-full h-0.5 bg-white opacity-30 mt-px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
