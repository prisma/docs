import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/urls'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/og/',
        '/*?query=*',
        '/*?page=*',
        '/*&query=*',
        '/*&page=*',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
