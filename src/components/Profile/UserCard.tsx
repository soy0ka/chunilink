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
  dateInfo: string;
  honners: { type: "GOLD" | "SILVER" | "PLATINA" | "RAINBOW" | "NORMAL"; label: string }[];
}

const UserCard: React.FC<UserCardProps> = ({
  userName,
  rank,
  avatarUrl,
  rating,
  friendCode,
  playCount,
  dateInfo,
  honners,
}) => {  
  return (
    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 bg-white/40 dark:bg-black/30 rounded-2xl shadow-xl border border-white/40 dark:border-white/10 backdrop-blur-lg px-8 py-8">
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
          <div className="flex items-center">
            <span className="font-bold text-gray-800 dark:text-gray-100">플레이 카운트</span>
            <span className="ml-1 text-indigo-700 dark:text-indigo-300 font-mono font-medium">{playCount}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-1">{dateInfo}</div>
      </div>
      <div className="flex flex-col items-center md:items-end gap-2">
        <RatingBox rating={rating} />
        <FriendCode code={friendCode} />
      </div>
    </div>
  );
};

export default UserCard;
