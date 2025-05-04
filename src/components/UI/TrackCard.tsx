'use client'; 

export default function TrackCard({
  speed = 11.00,
  mirror = false,
  track = {
    number: 1,
    difficulty: 'EXPERT',
    name: 'Titania',
    level: 13,
    plus: true,
    artist: 'xi',
    image: 'https://chunithm-net-eng.com/mobile/img/9e6a43c316deda23.jpg'
  }
}) {
  return (
    <div className="h-36 w-full max-w-lg flex flex-col shadow-md overflow-hidden border border-gray-300">
      {/* Header - Speed and Mirror status */}
      <div className="h-8 flex justify-center items-center px-6 bg-black border-b border-gray-800">
        <div className="text-gray-300 font-medium text-sm tracking-wide">SPEED : {speed.toFixed(2)}</div>
        <div className="h-5 border-l border-gray-700 mx-6"></div>
        <div className="text-gray-300 font-medium text-sm tracking-wide">MIRROR : {mirror ? 'ON' : 'OFF'}</div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col relative">
        {/* Album jacket - absolute positioned to overlap sections */}
        <div className="absolute left-0 top-0 bottom-0 w-28 h-28 z-10 border border-gray-300">
          <img 
            src={track.image}
            alt="Track artwork" 
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-0 right-1 text-xs text-white opacity-70">{track.artist}</span>
        </div>
        
        {/* Upper half - red background */}
        <div className="h-14 flex bg-red-600 pl-28">
          {/* Track difficulty info */}
          <div className="flex-1 px-3 py-1">
            {/* Track number */}
            <div className="text-xs text-white font-bold">TRACK {track.number}</div>
            {/* Difficulty */}
            <div className="text-2xl font-extrabold text-white leading-none tracking-wide mt-1">{track.difficulty}</div>
          </div>
          
          {/* Level indicator */}
          <div className="flex flex-col">
            <div className="bg-white text-black px-2 py-0.5 text-xs font-bold text-center">LEVEL</div>
            <div className="bg-blue-900 text-white w-14 h-11 font-bold text-3xl flex items-center justify-center">
              {track.level}
              {track.plus && <span className="text-xl -mt-3 ml-0.5 font-bold">+</span>}
            </div>
          </div>
        </div>
        
        {/* Lower half - white background */}
        <div className="h-14 bg-white pl-32 pr-3 flex flex-col justify-center">
          {/* Track name - 70% of space */}
          <div className="text-lg font-medium text-gray-700 truncate h-1/2 flex items-center">
            {track.name}
          </div>
          
          <div className="h-1/2 flex">
            <div className="text-xs text-gray-500 px-1 pt-1 border-t border-gray-300 w-full">
              {track.artist}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
