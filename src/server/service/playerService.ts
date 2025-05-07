
import { getServerAuthSession } from '@/library/auth'
import { prisma } from '@/library/prismaSingleton'
import { getPlayerBySlug } from '@/server/database/player'
import { notFound } from 'next/navigation'

export async function getPlayerData(id: string) {
	const session = await getServerAuthSession()

	if (id === '@me' || id === '%40me') {
		if (!session?.user?.id) return notFound()

		const player = await prisma.player.findFirst({
			where: { userId: session.user.id },
			select: { slug: true }
		})

		if (!player) return notFound()
		return getPlayerData(player.slug)
	}

	return getPlayerBySlug(id)
}
