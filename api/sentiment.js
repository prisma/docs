const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

export default async function handle(req, res) {
  const body = JSON.parse(req.body)
  if (!body.pageUrl) {
    throw new Error(`Please provide a pageUrl`)
  }

  if (!body.sentiment) {
    throw new Error(`Please provide a sentiment`)
  }

  if (!['Happy', 'Unhappy'].includes(body.sentiment)) {
    throw new Error(`Please provide "Happy" or "Unhappy" as the sentiment`)
  }
  const pageUrl = stripTrailingSlash(body.pageUrl)

  const feedback = await client.feedback.create({
    data: {
      pageUrl,
      ip: req.headers['x-forwarded-for'],
      userAgent: req.headers['user-agent'],
      sentiment: body.sentiment,
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

