const { hashSync } = require('bcryptjs')
const { pool } = require('../DB/db')
const { INSERT_USER } = require('../DB/queries')

const register = async (req, res) => {
  res.render('pages/register')
}

const registerPost = async (req, res) => {
  const { username, email, password } = req.body
  const values = [username, email, hashSync(password, 8)]
  const query = await INSERT_USER(values)
  
  try {
    await pool.query(query, values)
    return res.status(201).json({
      status: 201,
      message: 'user added successfully'
    })
  } catch (error) {
    res.send({ error: error?.detail })
  }
}

module.exports = {
  register,
  registerPost
}
