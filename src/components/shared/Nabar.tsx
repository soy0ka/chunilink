import NextLink from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nabar() {
  return (
    <header className="w-full p-4 backdrop-blur-md sticky top-0 shadow-md dark:shadow-white/10 z-1">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <NextLink href="/" className="flex items-center gap-2">
          <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-chuni-mint-700 to-chuni-violet-500">
            CHUNILINK
          </div>
        </NextLink>
        <div className="hidden md:flex items-center gap-6">
          <NextLink href="/scores" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">스코어보드</NextLink>
          <NextLink href="/upload" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">성과 업로드</NextLink>
          <NextLink href="/community" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">커뮤니티</NextLink>
          <NextLink href="/profile" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">프로필</NextLink>
          <ThemeToggle />
        </div>
        
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button aria-label="메뉴 열기" className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
