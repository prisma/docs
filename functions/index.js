const { PrismaClient, prismaVersion } = require('@prisma/client');
const yup = require('yup');

const client = new PrismaClient();

const schema = yup.object().shape({
  pageUrl: yup.string().require(),
  sentiment: yup.string().require(),
});

exports.handler = async function(event, context, callback) {
  const body = JSON.parse(event.body);

  await schema.isValid(body);

  const data = await client.feedback.create({
    data: {
      ip: event.headers['x-forwarded-for'],
      pageUrl: body.pageUrl,
      userAgent: event.headers['user-agent'],
      sentiment: body.sentiment,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ data, event }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
};
