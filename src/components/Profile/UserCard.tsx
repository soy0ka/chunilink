import Avatar from "@UI/Avatar";
import FriendCode from "@UI/FriendCode";
import Honner from "@UI/Honner";
import RatingBox from "@UI/Rating";
import { Share2 } from "lucide-react";
import React from "react";

interface UserCardProps {
  userName: string;
  rank: number;
  avatarUrl: string;
  rating: number;
  friendCode: string;
  playCount: number;
  lastPlayDate: Date;
  honners: { type: "GOLD" | "SILVER" | "PLATINA" | "RAINBOW" | "NORMAL"; label: string }[];
}

const UserCard: React.FC<UserCardProps> = ({
  userName,
  rank,
  avatarUrl,
  rating,
  friendCode,
  playCount,
  lastPlayDate,
  honners,
}) => {  
  // 국밥은 8천원으로 합시다
  const minWon = playCount * 1000;
  const maxWon = playCount * 1500;
  const minGukbap = Math.floor(minWon / 8000);
  const maxGukbap = Math.floor(maxWon / 8000);
  
  return (
    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 rounded-2xl shadow-xl border border-white/40 dark:border-white/10 backdrop-blur-2xl px-8 py-8">
      <div className="flex flex-col items-center md:items-start gap-3 flex-1">
        <div className="flex flex-col gap-1 w-full max-w-xs text-center">
          {honners.map((h, i) => (
            <Honner key={i} type={h.type}>
              {h.label}
            </Honner>
          ))}
        </div>
        <Avatar rank={rank} avatarUrl={avatarUrl} />
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-widest">
            {userName}
          </h1>
          <Share2 className="w-4 h-4 text-gray-400 hover:text-indigo-500 cursor-pointer transition-colors" />
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          <div className="flex items-center relative group">
            <span className="font-bold text-gray-800 dark:text-gray-100">플레이 카운트</span>
            <span className="ml-1 text-indigo-700 dark:text-indigo-300 font-mono font-medium group-hover:underline decoration-dashed decoration-indigo-300">
              {playCount}
            </span>
            
            <div className="absolute left-0 top-full mt-2 z-20 hidden group-hover:block w-max max-w-xs">
              <div className="bg-black/90 text-white text-xs rounded-lg px-3 py-2 shadow-xl border border-white/10">
              <div className="font-semibold mb-1 text-indigo-300">💰 환산 금액</div>
              <div className="text-gray-200 mb-2">
                약 {minWon.toLocaleString()}원 ~ {maxWon.toLocaleString()}원
              </div>
              <div className="font-semibold mb-1 text-amber-300">🍲 환산 국밥</div>
              <div className="text-gray-200 leading-relaxed">
                약 {minGukbap}GUBP ~{maxGukbap}GUBP
              </div>
              <div className="absolute w-3 h-3 left-4 -top-1.5 transform rotate-45 bg-black/90 border-t border-l border-white/10"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
          <span className="font-mono font-medium text-gray-400 dark:text-gray-100">
            {lastPlayDate.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="font-mono font-medium text-gray-400 dark:text-gray-100">· VERSE 3주차</span>
        </div>
      </div>
      <div className="flex flex-col items-center md:items-end gap-2">
        <RatingBox rating={rating} />
        <FriendCode code={friendCode} />
      </div>
    </div>
  );
};

export default UserCard;
