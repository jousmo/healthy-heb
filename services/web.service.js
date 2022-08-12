const fetch = require('node-fetch')
const { DefaultServices } = require('../types')

async function webIntegration({ alias, ...config }) {
  try {
    const controller = new AbortController();
    const timeout = config.timeout || DefaultServices.WebTimeout;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const headers = config.headers?.map((item) => {
      return [item.key, item.value];
    });

    const { status } = await fetch(config.host, { signal: controller.signal , headers })
    clearTimeout(timeoutId);
    return {
      status: status === 200,
      error: status !== 200 ? { http_status: status } : undefined
    }
  } catch(error) {
    return {
      status: false,
      error
    }
  }
}

module.exports = webIntegration
