const { Router } = require('express')
const { getMovie, addMovie, updateMovie, deleteMovie } = require('./../controllers/movieController')
const { secureData } = require('./../middlewares/utils')

const movieRouter = Router()

movieRouter.get('/getMovie', getMovie)
movieRouter.post('/addMovie', addMovie)
movieRouter.patch('/updateMovie', secureData, updateMovie)
movieRouter.delete('/deleteMovie', secureData, deleteMovie)

module.exports = movieRouter
