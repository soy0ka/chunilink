import { prisma } from '@/library/prismaSingleton'
import { RatingType } from '@prisma/client'

export async function getPlayerBySlug(slug: string) {
	return prisma.player.findUnique({
		where: { slug },
		include: {
			User: { select: { name: true, image: true } },
			PlayerCharacter: { include: { character: true } },
			PlayerHonor: {
				where: { isDisplayed: true },
				include: { honor: true },
				orderBy: { displayOrder: 'asc' }
			},
			PlayerScore: {
				orderBy: { rating: 'desc' },
				where: {
					OR: [{ ratingType: RatingType.NEW }, { ratingType: RatingType.OLD }]
				},
				include: {
					song: {
						include: { difficulties: true }
					}
				}
			}
		}
	})
}

export async function getPlayerMetadata(slug: string) {
	return prisma.player.findUnique({
		where: { slug },
		select: {
			name: true,
			rating: true
		}
	})
}
