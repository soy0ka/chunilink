import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black/60 backdrop-blur-lg py-10 border-t border-gray-200 dark:border-white/15 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="max-w-fit font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-chuni-mint-600 to-chuni-violet-500 mb-3">
            CHUNILINK
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
            본 웹사이트는 CHUNITHM의 비공식 팬 사이트로, SEGA와 직접적인 관련이 없습니다.
            게임 관련 데이터 및 콘텐츠의 저작권은 <a href="https://www.sega.com/" target="_blank" rel="noopener noreferrer" className="text-chuni-violet-500 hover:underline">SEGA</a>와 
            <a href="https://chunithm.sega.com/" target="_blank" rel="noopener noreferrer" className="text-chuni-violet-500 hover:underline"> 각 권리자</a>에게 있습니다.
            CHUNILINK는 비영리 목적으로 운영되는 커뮤니티 서비스입니다.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 items-center md:items-end">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white text-sm transition-colors duration-200 hover:underline underline-offset-4">소개</Link>
              <Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white text-sm transition-colors duration-200 hover:underline underline-offset-4">이용약관</Link>
              <Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white text-sm transition-colors duration-200 hover:underline underline-offset-4">개인정보처리방침</Link>
            </div>
            
            <div className="flex justify-center md:justify-end gap-4">
              <a href="https://discord.gg/your-discord" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-chuni-violet-500 transition-colors duration-200">
                <FaDiscord size={22} />
              </a>
              <a href="https://github.com/your-username/chunithm" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                <FaGithub size={22} />
              </a>
            </div>
            
            <div className="text-xs text-center md:text-right text-gray-500 dark:text-gray-400 mt-2">
              © {new Date().getFullYear()} CHUNILINK. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
