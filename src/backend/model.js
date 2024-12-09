const pgp = require('pg-promise')
class Pg {
  static client = null

  constructor() {
    if (!Pg.client) {
      const pg = pgp({
        schema: 'sk'
      })

      Pg.client = pg({
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'admin',
        database: 'postgres'
      })
    }
  }

  get getClient() {
    return Pg.client
  }
}

module.exports = { Pg }
