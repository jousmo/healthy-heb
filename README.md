# Healthy Check HEB
Review of the applied third-party services, obtains the assessment of the state in which they are found

## Implement
This pack is inspired `nodejs-health-checker`

Dependencies:

* [nodejs-health-checker](https://www.npmjs.com/package/@cloudnative/health-connect)
* [amqplib](https://www.npmjs.com/package/amqplib)
* [pg](https://node-postgres.com/) Only connection postgres Custom Service

```
npm install healthy-heb
```

### Integrations

* Redis
* Rabbitmq
* Memcache
* Web integration (https)
* Aws Dynamo DB
* Database (custom service con pg)
  * postgres
* Databases with sequelize
  * postgres 
  * mysql
  * sqlite
  * mariadb

## Use

```js
// Express config ....

const {   
  HealthTypes,
  Dialects,
  HealthcheckerDetailedCheck,
  HealthTypeRabbit
} = require('healthy-heb')

const options = {
  name: "My node application",
  version: "my version",
  integrations: [
    {
      type: HealthTypes.Redis,
      name: "redis integration",
      host: "redis",
    },
    {
      type: HealthTypes.Memcached,
      name: "My memcache integration",
      host: "memcache:11211",
    },
    {
      type: HealthTypes.Web,
      name: "my web api integration",
      host: "https://github.com/status",
      headers: [{ key: "Accept", value: "application/json" }],
    },
    {
      type: HealthTypes.Dynamo,
      name: "my dynamo",
      host: "http://localhost",
      port: 8000,
      Aws: {
        region: "us-east-1",
        access_key_id: "",
        secret_access_key: "",
      },
    },
    {
      type: HealthTypes.Database,
      name: "my database",
      host: "localhost",
      dbPort: 5432,
      dbName: "postgres",
      dbUser: "postgres",
      dbPwd: "root",
      dbDialect: Dialects.postgres,
    },
    {
      type: HealthTypes.Custom,
      name: "rabbit",
      host: "localhost",
      customCheckerFunction: () => HealthTypeRabbit({
        protocol: "amqp",
        hostname: "localhost",
        port: 5672,
        username: "rabbit",
        password: "rabbit",
        vhost: "rabbit"
      })
    },
    {
      type: HealthTypes.Custom,
      name: "postgres",
      host: "localhost",
      customCheckerFunction: () => HealthTypePostgres({
        user: 'dbuser',
        host: 'database.server.com',
        database: 'mydb',
        password: 'secretpassword',
        port: 3211,
        ...more
      })
    },
    {
      type: HealthTypes.Custom,
      name: "my custom integration",
      host: "localhost",
      customCheckerFunction: () => { return { status: true, error: {} }},
    },
  ]
}

router.get('/live', async (_, res) => {
  res.send(await HealthcheckerDetailedCheck(options))
})
```

## Note: As far as possible, contribute to the original project