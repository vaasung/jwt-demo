const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/authRouter')
const movieRouter = require('./routes/movieRouter')

const { PORT, WHITE_LISTING_URLs } = process.env
const app = express()

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

app.get('/', (req, res) =>
  res.render('pages/home', { token: req.cookies?.token, title: 'JWT Demo', username: global.username })
)
app.get('/add', (req, res) => res.render('pages/add', { title: 'JWT Demo - Add Movie' }))
app.get('/edit', (req, res) => res.render('pages/edit', { title: 'JWT Demo - Edit Movie' }))
app.get('/view', (req, res) => res.render('pages/view', { title: 'JWT Demo - View Movie' }))
app.get('/register', (req, res) =>
  res.render('pages/register', { token: req.cookies?.token, title: 'JWT Demo - Register' })
)
app.get('/login', (req, res) => res.render('pages/login', { token: req.cookies?.token, title: 'JWT Demo - Login' }))
app.get('/unAuth', (req, res) => res.render('pages/unAuth', { title: 'JWT Demo - Un authorized' }))
app.get('/*', (req, res) => res.render('pages/404', { title: 'JWT Demo = Page Not Found' }))

app.listen(PORT || 4000, console.log(`App started running ${PORT}`))
