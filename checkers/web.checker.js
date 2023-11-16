const { HealthyTypes } = require('../types')
const { webIntegration } = require('../services')
const { getDeltaTime } = require('../helpers')

async function webChecker(config) {
  const start = new Date().getTime();
  const result = await webIntegration(config);

  return {
    name: `${HealthyTypes.Web} integration`,
    alias: config.alias,
    status: result.status,
    duration: getDeltaTime(start),
    host: config.host,
    httpStatus: result?.httpStatus,
    error: result?.error || result?.error?.message
  };
}

module.exports = webChecker
