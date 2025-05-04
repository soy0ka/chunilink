'use client';

interface UserCardProps {
  level?: number;
  name?: string;
  rating?: number;
  title?: string;
  titleRating?: number;
  classIcon?: string;
  classLevel?: number;
  profileImage?: string;
  backgroundImage?: string;
  profileFrame?: string;
}

export default function UserCard({
  level = 21,
  name = 'YORU',
  rating = 14.50,
  title = 'THE ACHIEVER',
  titleRating = 14.50,
  profileImage = 'https://chunithm-net-eng.com/mobile/img/d39707c2e00671e7.png',
  backgroundImage = 'https://chunithm-net-eng.com/mobile/img/a72a32b5564990b2.png',
  profileFrame = 'https://chunithm-net-eng.com/mobile/images/charaframe_platina.png',
}: UserCardProps) {
  return (
    <div className="w-full h-36 relative rounded-lg overflow-hidden shadow-md border border-gray-200">
      {/* ── Background image ─────────────────────────────────────────────── */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-none select-none pointer-events-none"
      />

      {/* ── Title ribbon ─────────────────────────────────────────────────── */}
      <div 
        className="absolute top-7 right-0 w-2/3 z-10 h-6 px-3 flex items-center justify-center rounded-md text-black text-lg font-medium tracking-wider whitespace-nowrap"
        style={{
          backgroundImage: `url('https://chunithm-net-eng.com/mobile/images/honor_bg_gold.png')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        >
        {title} / RATING {titleRating.toFixed(2)}
      </div>

      {/* ── Bottom overlay section ───────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 flex">
        {/* Left 1/3 empty for background exposure */}
        <div className="w-1/3" />

        {/* Right 2/3 info section */}
        <div className="flex-1 bg-white/80 backdrop-blur-sm flex items-center justify-between">
          <div className="flex flex-col justify-center px-4 py-2 w-full">
            <div className="flex items-baseline space-x-2">
              <span className="text-black text-sm font-bold">Lv.{level}</span>
              <span className="text-black text-xl font-semibold tracking-wide">{name}</span>
            </div>

            <div className="w-full h-px bg-gray-300 my-1" />

            <div className="flex items-center">
              <span className="text-sm font-bold bg-gradient-to-b from-yellow-300 to-yellow-600 bg-clip-text text-transparent mr-2">RATING</span>
              <span className="text-2xl font-bold bg-gradient-to-b from-yellow-300 to-yellow-600 bg-clip-text text-transparent mr-2">{rating.toFixed(2)}</span>
            </div>
          </div>

          {/* Profile image with frame */}
          <div className="w-20 h-20 relative mr-2 shrink-0">
            <div className="absolute inset-0 z-10 pointer-events-none select-none" style={{ backgroundImage: `url(${profileFrame})` }}>
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
