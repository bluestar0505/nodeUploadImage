// Update with your config settings.

require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: 
    {
      //'postgres://192.168.1.107/sticker-mania'
      host: "192.168.1.107",
      user: "postgres",
      password: "123456",
      database: "sticker-mania"
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
