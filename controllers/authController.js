const { hashSync, compareSync } = require('bcryptjs')
const { pool } = require('../DB/db')
const { INSERT_USER, SELECT_TABLE } = require('../DB/queries')

const register = async (req, res) => {
  res.render('pages/register')
}

const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  const values = [username, email, hashSync(password, 8)]

  try {
    const query = await INSERT_USER(values)
    await pool.query(query, values)
    return res.status(201).json({
      status: 201,
      message: 'user added successfully'
    })
  } catch (error) {
    res.send({ error: error?.detail })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const queryUser = SELECT_TABLE('users', `email='${email}'`)
    const { rowCount, rows } = await pool.query(queryUser)

    if (rowCount === 0 || !rowCount) {
      return res.status(200).json({
        status: 200,
        message: 'User Doesnt exist'
      })
    }

    const comparePassword = compareSync(password, rows[0].password)

    if (!comparePassword) {
      return res.status(200).json({
        status: 200,
        message: 'username/password wrong'
      })
    }

    return res.status(200).json({
      status: 200,
      message: 'user logged-in successfully'
    })
  } catch (error) {
    res.send({ error: error?.detail ?? error })
  }
}

module.exports = {
  register,
  registerUser,
  loginUser
}
