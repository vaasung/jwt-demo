const { Router } = require('express')
const { getMovie, addMovie, updateMovie, deleteMovie, seedsMovie } = require('./../controllers/movieController')
const { secureData } = require('./../middlewares/utils')
const { verifyToken } = require('./../middlewares/token')

const movieRouter = Router()

movieRouter.get('/getMovie', verifyToken, getMovie)
movieRouter.post('/addMovie', verifyToken, addMovie)
movieRouter.post('/seeds', verifyToken, seedsMovie)
movieRouter.patch('/updateMovie', verifyToken, secureData, updateMovie)
movieRouter.delete('/deleteMovie', verifyToken, secureData, deleteMovie)

module.exports = movieRouter
