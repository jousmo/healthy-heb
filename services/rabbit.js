const amqp = require("amqplib");

module.exports = async config => {
  return new Promise(async (resolve, _) => {
    try {
      const connection = await amqp.connect(config)
      const channel = await connection.createChannel()
      await channel.close()
      await connection.close()
      resolve({ status: true })
    } catch (error) {
      resolve({ status: false, error })
    }
  })
}