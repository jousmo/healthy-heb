const { HealthyTypes } = require('../types')
const { webIntegration } = require('../services')
const { getDeltaTime } = require('../helpers')

async function webChecker(config) {
  const start = new Date().getTime();
  const result = await webIntegration(config);

  return {
    name: `${HealthyTypes.Web} integration`,
    status: result.status,
    duration: getDeltaTime(start),
    host: config.host,
    error: result?.error || result?.error?.message
  };
}

module.exports = webChecker
