const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.handler = async function(event, context, callback) {
  const body = JSON.parse(event.body);

  if (!body.pageUrl) {
    throw new Error(`Please provide a pageUrl`);
  }

  if (!body.sentiment) {
    throw new Error(`Please provide a sentiment`);
  }

  if (!['Happy', 'Unhappy'].includes(body.sentiment)) {
    throw new Error(`Please provide "Happy" or "Unhappy" as the sentiment`);
  }

  await client.feedback.create({
    data: {
      ip: event.headers['x-forwarded-for'],
      pageUrl: body.pageUrl,
      userAgent: event.headers['user-agent'],
      sentiment: body.sentiment,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
};
