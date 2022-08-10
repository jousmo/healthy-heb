const amqp = require('amqplib');

async function rabbitIntegration(config) {
  try {
    const connection = await amqp.connect(config)
    const channel = await connection.createChannel()
    await channel.close()
    await connection.close()
    return { status: true }
  } catch(error) {
    return { status: false, error }
  }
}

module.exports = rabbitIntegration
