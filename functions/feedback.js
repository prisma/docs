const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

exports.handler = async function(event, context, callback) {
  const body = JSON.parse(event.body)
  if (!body.feedback) {
    throw new Error(`Please provide feedback `)
  }
  if (!body.id) {
    throw new Error(`Please provide id to set the feedback for`)
  }

  const feedback = await client.feedback.update({
    data: {
      feedback: body.feedback
    },
    where: {
      id: body.id
    }
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      success: true,
      id: feedback.id
    }),
  }
}
