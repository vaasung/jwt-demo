const { Router } = require('express')
const { register, registerPost } = require('./../controllers/authController')

const router = Router()

router.get('/register', register)
router.post('/register', registerPost)

module.exports = router
