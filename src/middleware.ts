import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// 로그인이 필요한 경로 목록
const protectedPaths = ["/upload/", "/profile/@me"];

// 로그인한 사용자가 접근하면 리디렉션할 경로 목록 (로그인 페이지 등)
const authRoutes = ["/login"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // NextAuth 토큰 확인
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET
  });
  
  const isAuthenticated = !!token;
  
  // 1. 로그인 페이지와 같은 인증 경로에 이미 로그인한 사용자가 접근하는 경우
  if (isAuthenticated && authRoutes.some(route => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  
  // 2. 보호된 경로에 로그인하지 않은 사용자가 접근하는 경우
  const isProtectedPath = protectedPaths.some(
    (protectedPath) => path === protectedPath || path.startsWith(`${protectedPath}/`)
  );
  
  if (isProtectedPath && !isAuthenticated) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    "/upload/:path*",
    "/profile/@me",
    "/login",
  ],
};
