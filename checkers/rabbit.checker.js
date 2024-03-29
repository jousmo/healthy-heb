const { HealthyTypes } = require('../types')
const { rabbitIntegration } = require('../services')
const { getDeltaTime } = require('../helpers')

async function rabbitChecker(config) {
  const start = new Date().getTime();
  const result = await rabbitIntegration(config);

  return {
    name: `${HealthyTypes.Rabbit} integration`,
    alias: config.alias,
    status: result.status,
    duration: getDeltaTime(start),
    host: config.host,
    error: result?.error || result?.error?.message
  };
}

module.exports = rabbitChecker
