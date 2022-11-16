const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/authRouter')
const movieRouter = require('./routes/movieRouter')

const { PORT, WHITE_LISTING_URLs } = process.env
const app = express()

// app.use('/public', express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use([express.json(), express.urlencoded({ extended: true })])
app.use(cookieParser())
app.use(function (req, res, next) {
  req.headers.origin = req.headers.origin || req.headers.host
  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// const whitelist = WHITE_LISTING_URLs.split(',')
// const corsOptions = {
//   origin: (origin, cb) => {
//     console.log({ origin, whitelist })
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       cb(null, true)
//     } else {
//       cb(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))
app.use(cors())

app.use('/auth', authRouter)
app.use('/movie', movieRouter)

app.get('/', (req, res) => res.render('pages/home', { token: req.cookies?.token }))
app.get('/add', (req, res) => res.render('pages/add'))
app.get('/edit', (req, res) => res.render('pages/edit'))
app.get('/view', (req, res) => res.render('pages/view'))
app.get('/register', (req, res) => res.render('pages/register'))
app.get('/login', (req, res) => res.render('pages/login'))

app.listen(PORT || 4000, console.log(`App started running ${PORT}`))
