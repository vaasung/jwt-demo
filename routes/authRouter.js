const { Router } = require('express')
const { register, registerUser, loginUser } = require('./../controllers/authController')

const router = Router()

router.get('/register', register)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
