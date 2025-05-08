import { prisma } from '@/library/prismaSingleton'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID || '',
			clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
			authorization: {
				params: {
					scope: 'identify email',
					redirect_uri: process.env.DISCORD_CALLBACK_URL
				}
			}
		})
	],
	// 세션 전략 설정
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60 // 30일
	},
	// 디버그 모드 (개발 환경에서만 활성화)
	debug: process.env.NODE_ENV === 'development',
	// Secret 설정
	secret: process.env.NEXTAUTH_SECRET,

	// 커스텀 페이지 설정
	pages: {
		signIn: '/login',
		error: '/login'
	},

	callbacks: {
		async session({ token, session }) {
			if (token && session.user) {
				session.user.id = token.id as string
				session.user.name = token.name as string
				session.user.email = token.email as string
				session.user.image = token.picture as string
			}
			return session
		},
		async jwt({ token, user, account }) {
			// 초기 로그인 시 사용자 정보를 토큰에 추가
			if (account && user) {
				token.id = user.id
				token.provider = account.provider

				// 새 사용자가 로그인하면 Player 레코드 확인 또는 생성
				try {
					const existingPlayer = await prisma.player.findFirst({
						where: { userId: user.id }
					})

					// 플레이어 레코드가 없으면 기본 레코드 생성 (실제 구현에서는 추가 정보 입력 페이지로 리다이렉트)
					if (!existingPlayer) {
						console.log('새 사용자 로그인, 플레이어 정보 필요')
						token.needsProfile = true
					}
				} catch (error) {
					console.error('사용자 정보 확인 중 오류:', error)
				}
			}

			// 기존 사용자 정보 확인
			if (!user && token.email) {
				const dbUser = await prisma.user.findFirst({
					where: { email: token.email },
					include: { player: true }
				})

				if (dbUser) {
					token.id = dbUser.id
					token.hasPlayer = dbUser.player.length > 0
				}
			}

			return token
		},

		async redirect({ url, baseUrl }) {
			if (url.startsWith('/') || url.startsWith(baseUrl)) {
				return url
			}
			return baseUrl
		}
	}
}

export const getServerAuthSession = () =>
	import('next-auth').then(({ getServerSession }) => getServerSession(authOptions))
