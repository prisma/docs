const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

export default async function handle(req, res) {
  const { pageUrl, sentiment } = JSON.parse(req.body)
  if (!pageUrl) {
    throw new Error(`Please provide a pageUrl`)
  }

  if (!sentiment) {
    throw new Error(`Please provide a sentiment`)
  }

  if (!['Happy', 'Unhappy'].includes(sentiment)) {
    throw new Error(`Please provide "Happy" or "Unhappy" as the sentiment`)
  }
  const pagePath = stripTrailingSlash(pageUrl)

  const feedback = await client.feedback.create({
    data: {
      pageUrl: pagePath,
      ip: req.headers['x-forwarded-for'],
      userAgent: req.headers['user-agent'],
      sentiment: sentiment,
    },
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
    },
    body: JSON.stringify({
      success: true,
      id: feedback.id,
    }),
  }
}

function stripTrailingSlash(url) {
  return url.replace(/\/$/, '')
}
