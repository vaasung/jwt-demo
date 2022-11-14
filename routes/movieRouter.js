const { Router } = require('express')
const { getMovie, addMovie, updateMovie, deleteMovie } = require('./../controllers/movieController')

const movieRouter = Router()

movieRouter.get('/getMovie', getMovie)
movieRouter.post('/addMovie', addMovie)
movieRouter.patch('/updateMovie', updateMovie)
movieRouter.delete('/deleteMovie', deleteMovie)

module.exports = movieRouter
