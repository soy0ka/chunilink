import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | CHUNILINK",
  description: "요청하신 페이지를 찾을 수 없습니다.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="grid grid-rows-[1fr] items-center bg-white/30 dark:bg-background/30 backdrop-blur-lg text-gray-800 dark:text-foreground relative min-h-screen">
        <main className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
          <div className="backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border border-white/20 dark:border-gray-700/30 rounded-2xl p-12 shadow-xl">
            <div className="mb-8">
              <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-chuni-violet-500 via-chuni-mint-700 to-chuni-sky-700">
                404
              </h1>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              페이지를 찾을 수 없습니다
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              요청하신 페이지는 존재하지 않거나, 이동되었거나, 일시적으로 사용할 수 없습니다.
            </p>

            <Link
              href="/"
              className="px-8 py-3 bg-white/60 dark:bg-gray-800/60 border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-white rounded-xl shadow-lg backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition duration-200"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
