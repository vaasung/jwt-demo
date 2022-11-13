const express = require('express')
const cors = require('cors')
const path = require('path')

const router = require('./routes/authRouter')

const { PORT, WHITE_LISTING_URLs } = process.env
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use([express.json(), express.urlencoded({ extended: true })])
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const whitelist = WHITE_LISTING_URLs.split(',')
const corsOptions = {
  origin: (origin, cb) => {
    console.log({ origin })
    if (whitelist.indexOf(origin) !== 1) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

app.use(router)
app.get('/', (req, res) => res.render('pages/home'))
app.listen(PORT || 4000, console.log(`App started running ${PORT}`))
