const { pool } = require('../DB/db')
const { SELECT_TABLE } = require('../DB/queries')

const getMovie = async (req, res) => {
  try {
    const { id } = req.query ?? {}
    const getMovieListQuery = id !== undefined ? SELECT_TABLE('movies', `id=${parseInt(id)}`) : SELECT_TABLE('movies')
    // const getMovieListQuery = id !== undefined ? ÷ : SELECT_TABLE('movies')
    const movieList = (await pool.query(getMovieListQuery)).rows
    if (movieList.length <= 0) {
      return res.send({ message: 'no movies found' })
    }
    res.send({ message: 'success', data: movieList })
  } catch (error) {
    res.send({ message: 'error', error })
  }
}

const addMovie = async (req, res) => {
  const { movie_name, movie_rating, movie_cast, movie_genre, movie_release_date } = req.body
  try {
    const addMovieQuery =
      'INSERT INTO movies (movie_name, movie_rating, movie_cast, movie_genre, movie_release_date) VALUES ($1, $2, $3, $4, $5)'
    const mc = `{${movie_cast.map((d) => `"${d}"`)}}`
    const reqValues = { movie_name, movie_rating, movie_cast: mc, movie_genre, movie_release_date }
    const values = Object.values(reqValues)

    await pool.query(addMovieQuery, values)
    res.send({ message: 'Movie added successfully' })
  } catch (error) {
    res.send({ message: 'Error while adding movie', error })
  }
}

const updateMovie = async (req, res) => {
  const { id } = req.query ?? {}
  const { movie_name, movie_rating, movie_cast, movie_genre, movie_release_date } = req.body
  const updateMovieQuery = `UPDATE movies SET movie_name=$1, movie_rating=$2, movie_cast=$3 WHERE id=${parseInt(id)}`
  try {
    console.log(movie_name)
    await pool.query(updateMovieQuery, [movie_name, movie_rating, movie_cast])
    // pool
    //   .query(updateMovieQuery, [movie_name, movie_rating, movie_cast])
    //   .then()
    //   .catch((e) => console.log({ e }))
    res.send({ message: 'Movie updated successfully' })
  } catch (error) {
    res.send({ message: 'Error while updating movie', error })
  }
}
const deleteMovie = async (req, res) => {
  const { id } = req.query ?? {}
  const deleteMovieQuery = `DELETE FROM movies WHERE id=${parseInt(id)}`

  try {
    await pool.query(deleteMovieQuery)
    res.send({ message: 'Movie deleted successfully' })
  } catch (error) {
    res.send({ message: 'Error while deleting movie', error })
  }
}

module.exports = {
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie
}
