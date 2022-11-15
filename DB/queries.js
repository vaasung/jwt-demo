const { pool } = require('./db')

const COL_NAME = (table) => `SELECT column_name FROM information_schema.columns WHERE table_name = '${table}';`

const SELECT_TABLE = (tableName, whereClause) => {
  return `SELECT * FROM ${tableName} ${whereClause ? `WHERE ${whereClause}` : ''} ${!whereClause ? 'LIMIT 30' : ''}`
}

const INSERT_USER = async (values) => {
  const vals = values.map((d, i) => `$${(i = i + 1)}`)
  const columnNameQ = COL_NAME('users')
  const columnNames = (await pool.query(columnNameQ)).rows.map(({ column_name }) => column_name).slice(1)

  return `INSERT INTO users(${[...columnNames]}) VALUES(${[...vals]}) RETURNING *`
}

const INSERT_TABLE = async (tableName, values) => {
  const vals = values.map((d, i) => `$${(i = i + 1)}`)
  const columnNameQ = COL_NAME('movies')
  const columnNames = (await pool.query(columnNameQ)).rows.map(({ column_name }) => column_name).slice(1)
  return `INSERT INTO ${tableName} (${[...columnNames]}) VALUES (${[...vals]})`
}

const UPDATE_TABLE = async (tableName, values, query) => {
  const keys = Object.keys(values)
  const value = Object.values(values).map((d, i) => `$${(i = i + 1)}`)
  return `UPDATE ${tableName} SET ${keys.map((d, i) => `${d} = ${value[i]}`)} WHERE ${query}`
}

const DELETE_BY = (tableName, query) => `DELETE FROM ${tableName} WHERE ${query}`

module.exports = {
  COL_NAME,
  INSERT_USER,
  SELECT_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_BY
}
