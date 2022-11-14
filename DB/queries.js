const { pool } = require('./db')

const COL_NAME = (table) => `SELECT column_name FROM information_schema.columns WHERE table_name = '${table}';`

const SELECT_TABLE = (tableName, whereClause) => {
  return `SELECT * FROM ${tableName} ${whereClause ? `WHERE ${whereClause}` : ''} ${!whereClause ? 'LIMIT 30' : ''}`
}

const INSERT_USER = async (values) => {
  const val = values.map((d, i) => `$${(i = i + 1)}`)
  const columnNameQ = COL_NAME('users')
  const columnNames = (await pool.query(columnNameQ)).rows.map(({ column_name }) => column_name).slice(1)

  return `INSERT INTO users(${[...columnNames]}) VALUES(${[...val]}) RETURNING *`
}

module.exports = {
  INSERT_USER,
  SELECT_TABLE
}
