import { Menu } from '@/components/Profile/Menubar'
import RatingSongs from '@/components/Profile/RatingSongs'
import UserCard from '@/components/Profile/UserCard'

export default function ProfilePage() {
	return (
		<div className="dark:bg-background/70 min-w-screen relative min-h-screen bg-white/30 py-10 backdrop-blur-2xl">
			<div className="mx-6">
				<div className="mx-auto max-w-4xl">
					<UserCard
						userName="YORU"
						rank={32}
						avatarUrl="https://chunithm-net-eng.com/mobile/img/d39707c2e00671e7.png"
						rating={14.5}
						friendCode="9000950759408"
						playCount={222}
						lastPlayDate={new Date('2025-05-04:20:34')}
						honners={[
							{ type: 'GOLD', label: 'THE ACHIEVER／RATING 14.50' },
							{ type: 'SILVER', label: 'CHUNITHMer SUN PLUS' }
						]}
					/>
					<Menu />

					{/* 레이팅 곡 목록 추가 */}
					<RatingSongs songs={[]} />
				</div>
			</div>
		</div>
	)
}
