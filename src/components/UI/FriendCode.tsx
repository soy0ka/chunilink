'use client'
import { Copy } from 'lucide-react';

interface FriendCodeProps {
  code: string;
}

export function FriendCode({ code }: FriendCodeProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
      <span>친구 코드</span>
      <span className="font-mono hover:underline" onClick={() => navigator.clipboard.writeText(code)}>
        {code}
      </span>
      <Copy className="w-3 h-3 text-gray-400 hover:text-indigo-500 cursor-pointer transition-colors" onClick={() => navigator.clipboard.writeText(code)} />
    </div>
  );
}

export default FriendCode;
