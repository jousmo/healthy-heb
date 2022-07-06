const {
  HealthcheckerDetailedCheck
} = require('nodejs-health-checker/dist/healthchecker/healthchecker');
const { Dialects, HealthTypes } = require('nodejs-health-checker/dist/interfaces/types');
const { HealthTypeRabbit, HealthTypePostgres } = require('./services')

module.exports = {
  HealthTypes,
  Dialects,
  HealthcheckerDetailedCheck,
  HealthTypeRabbit,
  HealthTypePostgres
}