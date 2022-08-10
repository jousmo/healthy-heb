const { HealthyTypes } = require('./types')
const {
  webChecker,
  postgresChecker,
  rabbitChecker
} = require('./checkers')
const { getDeltaTime } = require('./helpers')

async function Healthy(config) {
  try {
    const promisesList = [];
    const start = new Date().getTime();

    config.integrations.forEach(item => {
      switch (item.type) {
        case HealthyTypes.Web:
          promisesList.push(webChecker(item));
          break;
        case HealthyTypes.Postgres:
          promisesList.push(postgresChecker(item));
          break;
        case HealthyTypes.Rabbit:
          promisesList.push(rabbitChecker(item));
          break;
      }
    });

    const results = await Promise.all(promisesList);
    const integrations = results.map((item) => item);
    return {
      name: config.name || "",
      version: config.version || "",
      status: !integrations.some(({ status }) => status === false),
      date: new Date(),
      duration: getDeltaTime(start),
      integrations,
    };
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  Healthy,
  HealthyTypes
}
