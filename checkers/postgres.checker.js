const { HealthyTypes } = require('../types')
const { postgresIntegration } = require('../services')
const { getDeltaTime } = require('../helpers')

async function postgresChecker(config) {
  const start = new Date().getTime();
  const result = await postgresIntegration(config);

  return {
    name: `${HealthyTypes.Postgres} integration`,
    alias: config.alias,
    status: result.status,
    duration: getDeltaTime(start),
    host: config.host,
    error: result?.error || result?.error?.message
  };
}

module.exports = postgresChecker
