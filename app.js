const express = require('express')

const router = require('./routes/authRouter')

const { PORT, PGURL } = process.env
const app = express()

app.use(express.static('public'))
app.use([express.json(), express.urlencoded({ extended: true })])
app.set('view engine', 'ejs')

app.use(router)
app.get('/', (req, res) => res.render('pages/home'))
app.listen(PORT ?? 4000)
