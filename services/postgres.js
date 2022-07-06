const { Client } = require('pg')

module.exports = async config => {
  return new Promise(async (resolve, _) => {
    try {
      const client = new Client(config)
      await client.connect()
      await client.end()
      resolve({ status: true })
    } catch (error) {
      resolve({ status: false, error })
    }
  })
}