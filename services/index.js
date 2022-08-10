const webIntegration = require('./web.service')
const postgresIntegration = require('./postgres.service')
const rabbitIntegration = require('./rabbit.service')

module.exports = {
  webIntegration,
  postgresIntegration,
  rabbitIntegration
}
