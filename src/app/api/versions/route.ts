import { CHUNITHM_INTERNATIONAL_VERSIONS } from '@/constants/version'

export const GET = () => {
  return new Response(JSON.stringify(CHUNITHM_INTERNATIONAL_VERSIONS), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
