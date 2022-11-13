const express = require('express')
const path = require('path')

const router = require('./routes/authRouter')

const { PORT } = process.env
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use([express.json(), express.urlencoded({ extended: true })])
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(router)
app.get('/', (req, res) => res.render('pages/home'))
app.listen(PORT || 4000, console.log(`App started running ${PORT}`))
