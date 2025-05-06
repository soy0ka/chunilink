// 'use client'

// interface UserCardProps {
// 	level?: number
// 	name?: string
// 	rating?: number
// 	title?: string
// 	titleRating?: number
// 	classIcon?: string
// 	classLevel?: number
// 	profileImage?: string
// 	backgroundImage?: string
// 	profileFrame?: string
// }

// export default function UserCard({
// 	level = 21,
// 	name = 'YORU',
// 	rating = 14.5,
// 	title = 'THE ACHIEVER',
// 	titleRating = 14.5,
// 	profileImage = 'https://chunithm-net-eng.com/mobile/img/d39707c2e00671e7.png',
// 	backgroundImage = 'https://chunithm-net-eng.com/mobile/img/a72a32b5564990b2.png',
// 	profileFrame = 'https://chunithm-net-eng.com/mobile/images/charaframe_platina.png'
// }: UserCardProps) {
// 	return (
// 		<div className="relative h-36 w-full overflow-hidden rounded-lg border border-gray-200 shadow-md">
// 			{/* ── Background image ─────────────────────────────────────────────── */}
// 			<img
// 				src={backgroundImage}
// 				alt="Background"
// 				className="pointer-events-none absolute inset-0 h-full w-full select-none object-none"
// 			/>

// 			{/* ── Title ribbon ─────────────────────────────────────────────────── */}
// 			<div
// 				className="absolute right-0 top-7 z-10 flex h-6 w-2/3 items-center justify-center whitespace-nowrap rounded-md px-3 text-lg font-medium tracking-wider text-black"
// 				style={{
// 					backgroundImage: `url('https://chunithm-net-eng.com/mobile/images/honor_bg_gold.png')`,
// 					backgroundSize: 'cover',
// 					backgroundPosition: 'center'
// 				}}
// 			>
// 				{title} / RATING {titleRating.toFixed(2)}
// 			</div>
// {/*  */}
// 			{/* ── Bottom overlay section ───────────────────────────────────────── */}
// 			<div className="absolute bottom-0 left-0 right-0 flex">
// 				{/* Left 1/3 empty for background exposure */}
// 				<div className="w-1/3" />

// 				{/* Right 2/3 info section */}
// 				<div className="flex flex-1 items-center justify-between bg-white/80 backdrop-blur-sm">
// 					<div className="flex w-full flex-col justify-center px-4 py-2">
// 						<div className="flex items-baseline space-x-2">
// 							<span className="text-sm font-bold text-black">Lv.{level}</span>
// 							<span className="text-xl font-semibold tracking-wide text-black">{name}</span>
// 						</div>

// 						<div className="my-1 h-px w-full bg-gray-300" />

// 						<div className="flex items-center">
// 							<span className="mr-2 bg-gradient-to-b from-yellow-300 to-yellow-600 bg-clip-text text-sm font-bold text-transparent">
// 								RATING
// 							</span>
// 							<span className="mr-2 bg-gradient-to-b from-yellow-300 to-yellow-600 bg-clip-text text-2xl font-bold text-transparent">
// 								{rating.toFixed(2)}
// 							</span>
// 						</div>
// 					</div>

// 					{/* Profile image with frame */}
// 					<div className="relative mr-2 h-20 w-20 shrink-0">
// 						<div
// 							className="pointer-events-none absolute inset-0 z-10 select-none"
// 							style={{ backgroundImage: `url(${profileFrame})` }}
// 						>
// 							<img src={profileImage} alt="Profile" className="h-full w-full object-contain" />
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
