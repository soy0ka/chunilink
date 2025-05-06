import { PlayRank } from "@prisma/client"

const rankRanges = [
  { rank: PlayRank.D,        minScore: 0,         maxScore:  499_999 },
  { rank: PlayRank.C,        minScore: 500_000,   maxScore:  599_999 },
  { rank: PlayRank.B,        minScore: 600_000,   maxScore:  699_999 },
  { rank: PlayRank.BB,       minScore: 700_000,   maxScore:  799_999 },
  { rank: PlayRank.BBB,      minScore: 800_000,   maxScore:  899_999 },
  { rank: PlayRank.A,        minScore: 900_000,   maxScore:  924_999 },
  { rank: PlayRank.AA,       minScore: 925_000,   maxScore:  949_999 },
  { rank: PlayRank.AAA,      minScore: 950_000,   maxScore:  974_999 },
  { rank: PlayRank.S,        minScore: 975_000,   maxScore:  989_999 },
  { rank: PlayRank.S_PLUS,   minScore: 990_000,   maxScore:  999_999 },
  { rank: PlayRank.SS,       minScore: 1_000_000, maxScore: 1_004_999 },
  { rank: PlayRank.SS_PLUS,  minScore: 1_005_000, maxScore: 1_007_499 },
  { rank: PlayRank.SSS,      minScore: 1_007_500, maxScore: 1_008_999 },
  { rank: PlayRank.SSS_PLUS, minScore: 1_009_000, maxScore: 1_010_000 },
]

export default rankRanges
