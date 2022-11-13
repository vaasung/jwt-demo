const { Client, Pool } = require('pg')
require('dotenv').config()
const { PGURL } = process.env

const pool = new Pool({ connectionString: PGURL })
pool.on('connect', () => {
  console.log('connected to the db')
})
pool.on('error', (err) => {
  console.log('Error while connecting the DB...', {err})
})

module.exports = { pool }
