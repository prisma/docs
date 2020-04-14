const { PrismaClient, prismaVersion } = require('@prisma/client');

const client = new PrismaClient();

exports.handler = async function(event, context, callback) {
  const data = await client.feedback.findMany();

  return {
    statusCode: 200,
    body: JSON.stringify({ data, event }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
};
