const webChecker = require('./web.checker')
const postgresChecker = require('./postgres.checker')
const rabbitChecker = require('./rabbit.checker')

module.exports = {
  webChecker,
  postgresChecker,
  rabbitChecker
}
