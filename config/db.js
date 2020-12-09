var config = {
  database: {
    host: 'localhost', // database host
    user: 'root', // your database username
    password: 'root', // your database password
    port: 3306, // default MySQL port
    db: 'interview', // your database name
    insecureAuth: true
  },
  server: {
    host: '127.0.0.1',
    port: '3000'
  }
}

module.exports = config