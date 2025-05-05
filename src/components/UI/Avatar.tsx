import Image from "next/image";

interface AvatarProps {
  rank: number;
  avatarUrl: string;
}

const AvatarFrameUrls = {
  NORMAL: "https://chunithm-net-eng.com/mobile/images/charaframe_normal.png",
  BRONZE: "https://chunithm-net-eng.com/mobile/images/charaframe_bronze.png",
  SILVER: "https://chunithm-net-eng.com/mobile/images/charaframe_silver.png",
  GOLD: "https://chunithm-net-eng.com/mobile/images/charaframe_gold.png",
  PLATINA: "https://chunithm-net-eng.com/mobile/images/charaframe_platina.png",
  RAINBOW: "https://chunithm-net-eng.com/mobile/images/charaframe_rainbow.png",
};

function getFrameUrlByRank(rank: number) {
  if (rank === undefined) return AvatarFrameUrls.PLATINA;
  if (rank >= 1 && rank <= 4) return AvatarFrameUrls.NORMAL;
  if (rank >= 5 && rank <= 9) return AvatarFrameUrls.BRONZE;
  if (rank >= 10 && rank <= 14) return AvatarFrameUrls.SILVER;
  if (rank >= 15 && rank <= 24) return AvatarFrameUrls.GOLD;
  if (rank >= 25 && rank <= 49) return AvatarFrameUrls.PLATINA;
  if (rank >= 50 && rank <= 99) return AvatarFrameUrls.RAINBOW;
  if (rank >= 100) return AvatarFrameUrls.RAINBOW;
  return AvatarFrameUrls.PLATINA;
}

const Avatar: React.FC<AvatarProps> = ({
  rank = 1,
  avatarUrl = "https://chunithm-net-eng.com/mobile/img/d39707c2e00671e7.png",
}) => {
  const resolvedFrameUrl = getFrameUrlByRank(rank);

  return (
    <div className="w-26 h-26 overflow-hidden shadow" style={{
      backgroundImage: `url(${resolvedFrameUrl})`,
      backgroundSize: "cover",
    }}>
      <span className="flex w-full h-full items-center justify-center text-5xl text-gray-400">
        <Image
          src={avatarUrl}
          alt="Avatar"
          width={95}
          height={95}
          />
      </span>
    </div>
  );
};

export default Avatar;
