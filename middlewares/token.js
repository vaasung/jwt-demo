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
  // Testing without token only for localhost 3000
  if(req.headers.referer.includes('3000')){
    return next()
  }
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
    return res.status(401).send({
      status: 401,
      message: 'Your are not authorized to access this page'
    })
  }
}

module.exports = {
  generateToken,
  verifyToken
}
