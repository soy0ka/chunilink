import UserCard from "@/components/Profile/UserCard";
import { FileText, Footprints, ImageIcon, Music } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen bg-white/30 dark:bg-background/70 backdrop-blur-2xl min-w-screen py-10">
      <div className="mx-6">
        <div className="max-w-4xl mx-auto">
          <UserCard
            userName="YORU"
            rank={32}
            avatarUrl="https://chunithm-net-eng.com/mobile/img/d39707c2e00671e7.png"
            rating={14.50}
            friendCode="9000950759408"
            playCount={222}
            dateInfo="2023년 10월 1일 기준"
            honners={[
              { type: "GOLD", label: "THE ACHIEVER／RATING 14.50" },
              { type: "SILVER", label: "CHUNITHMer SUN PLUS" },
            ]}
          />
          
          {/* 탭 메뉴 */}
          <div className="mt-8 flex justify-center gap-8">
            <button className="flex flex-col items-center px-4 py-2 rounded-lg bg-white/40 dark:bg-black/20 shadow hover:bg-white/60 dark:hover:bg-black/40 transition">
              <Music className="w-5 h-5" />
              <span className="text-xs mt-1 font-semibold">레이팅</span>
            </button>
            <button className="flex flex-col items-center px-4 py-2 rounded-lg bg-white/40 dark:bg-black/20 shadow hover:bg-white/60 dark:hover:bg-black/40 transition">
              <FileText className="w-5 h-5" />
              <span className="text-xs mt-1 font-semibold">기록</span>
            </button>
            <button className="flex flex-col items-center px-4 py-2 rounded-lg bg-white/40 dark:bg-black/20 shadow hover:bg-white/60 dark:hover:bg-black/40 transition">
              <Footprints className="w-5 h-5" />
              <span className="text-xs mt-1 font-semibold">순회</span>
            </button>
            <button className="flex flex-col items-center px-4 py-2 rounded-lg bg-white/40 dark:bg-black/20 shadow hover:bg-white/60 dark:hover:bg-black/40 transition">
              <ImageIcon className="w-5 h-5" />
              <span className="text-xs mt-1 font-semibold">사진관</span>
            </button>
          </div>
          
          {/* 아래에 추가 콘텐츠(예: 곡 리스트 등) 삽입 가능 */}
        </div>
      </div>
    </div>
  );
}
