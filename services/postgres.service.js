const { Client } = require('pg')

async function postgresIntegration(config) {
  try {
    const client = new Client(config)
    await client.connect()
    await client.end()
    return { status: true }
  } catch(error) {
    return { status: false, error }
  }
}

module.exports = postgresIntegration
