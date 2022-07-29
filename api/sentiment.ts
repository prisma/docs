const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

export default async function handle(req: any, res: any) {
  const { pageUrl, sentiment } = req.body
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

  const sentimentResult = await client.feedback.create({
    data: {
      pageUrl: pagePath,
      ip: req.headers['x-forwarded-for'],
      userAgent: req.headers['user-agent'],
      sentiment: sentiment,
    },
  })
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  return res.send(sentimentResult)
}

function stripTrailingSlash(url: any) {
  return url.replace(/\/$/, '')
}
