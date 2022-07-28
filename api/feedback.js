const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

export default async function handle(req, res) {
  const body = JSON.parse(req.body)
  if (!body.feedback) {
    throw new Error(`Please provide feedback `)
  }
  if (!body.id) {
    throw new Error(`Please provide id to set the feedback for`)
  }

  const fetchedFeedback = await client.feedback.findUnique({
    where: {
      id: body.id,
    },
    select: {
      feedback: true,
    },
  })

  if (fetchedFeedback.feedback) {
    // Don't allow updating existing feedback
    return {
      statusCode: 400,
    }
  }

  const feedback = await client.feedback.update({
    data: {
      feedback: body.feedback,
    },
    where: {
      id: body.id,
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
