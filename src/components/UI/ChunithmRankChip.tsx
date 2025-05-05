// 3가지 분류의 CHUNITHM 칩 타입
const CHIP_TYPES = {
  // 금색 칩
  CLEAR: { text: 'CLEAR', type: 'gold' },
  HARD: { text: 'HARD', type: 'gold' },
  BRAVE: { text: 'BRAVE', type: 'gold' },
  FULL_COMBO: { text: 'FULL COMBO', type: 'gold' },
  FULL_CHAIN_GOLD: { text: 'FULL CHAIN', type: 'gold' },

  // 백금색 칩 (크림색 바탕에 대각선 무지개 패턴)
  S: { text: 'S', type: 'platinum' },
  S_PLUS: { text: 'S+', type: 'platinum' },
  SS: { text: 'SS', type: 'platinum' },
  SS_PLUS: { text: 'SS+', type: 'platinum' },
  SSS: { text: 'SSS', type: 'platinum' },
  ALL_JUSTICE: { text: 'ALL JUSTICE', type: 'platinum' },
  FULL_CHAIN_PLATINUM: { text: 'FULL CHAIN', type: 'platinum' },

  // 무지개색 칩
  SSS_PLUS: { text: 'SSS+', type: 'rainbow' },
  ABSOLUTE: { text: 'ABSOLUTE', type: 'rainbow' },
  CATASTROPHY: { text: 'CATASTROPHY', type: 'rainbow' },
  AJC: { text: 'AJC', type: 'rainbow' },

  // 일반, 브론즈, 실버 칩
  NONE: { text: 'NONE', type: 'none' },
  BRONZE: { text: 'BRONZE', type: 'bronze' },
  SILVER: { text: 'SILVER', type: 'silver' },
  D: { text: 'D', type: 'none' },
  C: { text: 'C', type: 'bronze' },
  BBB: { text: 'B', type: 'silver' },
  A: { text: 'A', type: 'gold' },
  AA: { text: 'AA', type: 'gold' },
  AAA: { text: 'AAA', type: 'gold' },
} as const;

type ChipType = keyof typeof CHIP_TYPES;

interface AchievementChipProps {
  type: ChipType;
  count?: number;
  total?: number;
}

const AchievementChip = ({ type, count = 0, total = 71 }: AchievementChipProps) => {
  const chipInfo = CHIP_TYPES[type];

  let headerStyle = {};
  let textColorClass = "text-black";

  switch (chipInfo.type) {
    case 'gold':
      headerStyle = {
        background: 'linear-gradient(to right, #e6b800, #ffd700, #e6b800)',
        fontWeight: 'bold'
      };
      break;
    case 'platinum':
      // 백금: 크림색 바탕 + 대각선 무지개 스트라이프 + 파란 테두리
      headerStyle = {
        background: 'linear-gradient(45deg, #fffbe6 80%, #e0e7ff 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontWeight: 'bold',
      };
      break;
    case 'rainbow':
      headerStyle = {
      background: 'linear-gradient(75deg, #DFFDFE 0%, #5472FB 20%, #5472FB 40%, #5472FB 60%, #FFFED8 75%, #FFFF73 87%, #DBFF58 100%)',
      fontWeight: 'bold',
      position: 'relative',
      overflow: 'hidden',
      };
      textColorClass = "text-blue-700 font-bold";
      break;
    case 'none':
      headerStyle = {
        background: 'linear-gradient(90deg, #757473 0%, #666665 50%, #626261 100%)',
        fontWeight: 'bold',
      };
      textColorClass = "text-gray-900 font-bold";
      break;
    case 'bronze':
      headerStyle = {
        background: 'linear-gradient(90deg, #FF9135 0%, #C45D0A 30%, #F2730B 60%, #CD6108 100%)',
        fontWeight: 'bold',
      };
      textColorClass = "text-orange-900 font-bold";
      break;
    case 'silver':
      headerStyle = {
        background: 'linear-gradient(90deg, #79F2FF 0%, #1EC7ED 30%, #93FFFF 60%, #1CF3FA 100%)',
        fontWeight: 'bold',
      };
      textColorClass = "text-gray-700 font-bold";
      break;
    default:
      headerStyle = {
        background: '#f3f4f6',
        fontWeight: 'bold'
      };
  }

  return (
    <div className="rounded-md overflow-hidden shadow-md w-full max-w-32 border border-gray-200">
      <div
        className={`w-full py-1 px-2 flex justify-center items-center ${textColorClass} relative`}
        style={headerStyle}
      >
        {chipInfo.type === 'platinum' && (
          <>
            {/* 대각선 무지개 스트라이프 */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                style={{
                  width: '200%',
                  height: '200%',
                  position: 'absolute',
                  left: '-50%',
                  top: '-50%',
                  background:
                    'repeating-linear-gradient(45deg, rgba(255,0,0,0.10) 0 8px, transparent 8px 16px, rgba(255,165,0,0.10) 16px 24px, transparent 24px 32px, rgba(0,255,0,0.10) 32px 40px, transparent 40px 48px, rgba(0,0,255,0.10) 48px 56px, transparent 56px 64px, rgba(128,0,128,0.10) 64px 72px, transparent 72px 80px)'
                }}
              />
            </div>
            {/* 은은한 광택 효과 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60 pointer-events-none" />
          </>
        )}
        {chipInfo.type === 'rainbow' && (
          <>
            {/* 무지개 컬러 오버레이 */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  background:
                    'linear-gradient(90deg, #FF5B5B 0%, #FFB65B 16%, #FFF65B 33%, #5BFF8A 50%, #5BCBFF 66%, #7B5BFF 83%, #FF5BDE 100%)',
                  opacity: 1,
                }}
              />
            </div>
            {/* 광택 효과 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60 pointer-events-none z-10" />
          </>
        )}
        <span className="relative z-10 text-shadow-sm">{chipInfo.text}</span>
      </div>
      <div className="bg-white w-full flex flex-col items-center justify-center py-3">
        <div className="text-4xl md:text-5xl font-bold text-gray-800">{count}</div>
        <div className="text-lg md:text-xl font-normal text-gray-600">/{total}</div>
      </div>
    </div>
  );
};

// 3가지 타입 예시 컴포넌트
const ChunithmChipExamples = () => {
  return (
    <div className="p-6 rounded-xl backdrop-blur-md bg-white/30 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">
        CHUNITHM 칩 타입 예시
      </h2>
      
      <div className="space-y-8">
        {/* 일반/브론즈/실버 타입 */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">일반/브론즈/실버 타입</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <AchievementChip type="NONE" count={10} />
            <AchievementChip type="BRONZE" count={7} />
            <AchievementChip type="SILVER" count={3} />
          </div>
        </div>
        
        {/* 금색 타입 */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">금색 타입</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <AchievementChip type="CLEAR" count={8} />
            <AchievementChip type="HARD" count={5} />
            <AchievementChip type="BRAVE" count={0} />
          </div>
        </div>
        
        {/* 백금 타입 */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">백금 타입</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <AchievementChip type="S" count={12} />
            <AchievementChip type="SS" count={7} />
            <AchievementChip type="SSS" count={2} />
          </div>
        </div>
        
        {/* 무지개 타입 */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">무지개 타입</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <AchievementChip type="SSS_PLUS" count={1} />
            <AchievementChip type="ABSOLUTE" count={0} />
            <AchievementChip type="AJC" count={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

// 개별 칩 상세 보기
const ChipDetails = () => {
  return (
    <div className="p-6 rounded-xl backdrop-blur-md bg-white/30 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">
        칩 상세 디자인
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {/* 일반 타입 예시 */}
        <div className="flex flex-col items-center">
          <p className="mb-2 font-medium">일반 타입: D</p>
          <div className="w-32">
            <AchievementChip type="D" count={0} />
          </div>
        </div>
        
        {/* 브론즈 타입 예시 */}
        <div className="flex flex-col items-center">
          <p className="mb-2 font-medium">브론즈 타입: C</p>
          <div className="w-32">
            <AchievementChip type="C" count={0} />
          </div>
        </div>
        
        {/* 실버 타입 예시 */}
        <div className="flex flex-col items-center">
          <p className="mb-2 font-medium">실버 타입: BBB</p>
          <div className="w-32">
            <AchievementChip type="BBB" count={0} />
          </div>
        </div>

        {/* 금 타입 예시 */}
        <div className="flex flex-col items-center">
          <p className="mb-2 font-medium">금 타입: AAA</p>
          <div className="w-32">
            <AchievementChip type="AAA" count={0} />
          </div>
        </div>
      
        <div className="flex flex-col items-center">
          <p className="mb-2 font-medium">백금 타입: SSS</p>
          <div className="w-32">
            <AchievementChip type="SSS" count={0} />
          </div>
        </div>
        
        {/* SS 칩 (백금 타입) - 이미지 2와 일치하게 */}
        <div className="flex flex-col items-center">
          <p className="mb-2 font-medium">백금 타입: SS+</p>
          <div className="w-32">
            <AchievementChip type="SS" count={0} />
          </div>
        </div>
        
        {/* 무지개 타입 예시 */}
        <div className="flex flex-col items-center">
          <p className="mb-2 font-medium">무지개 타입: SSS+</p>
          <div className="w-32">
            <AchievementChip type="SSS_PLUS" count={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

// 메인 컴포넌트
export default function ChunithmChips() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-10">
      <ChipDetails />
      <ChunithmChipExamples />
    </div>
  );
}
