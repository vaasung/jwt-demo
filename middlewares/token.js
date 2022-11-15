const jwt = require('jsonwebtoken')
const { MAX_AGE } = require('./../utils/constants')
const { JWT_SECRET } = process.env

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: MAX_AGE
  })
}
const verifyToken = (req, res, next) => {
  const token = req.cookies.token
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.send({
          message: err
        })
      }
      console.log({ decodedToken })
      next()
    })
  } else {
    return res.send({
      message: 'token expired'
    })
  }
}

module.exports = {
  generateToken,
  verifyToken
}
