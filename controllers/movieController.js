const { pool } = require('../DB/db')
const { SELECT_TABLE, INSERT_TABLE, COL_NAME, UPDATE_TABLE, DELETE_BY } = require('../DB/queries')

const getMovie = async (req, res) => {
  try {
    const { id } = req.query ?? {}
    const getMovieListQuery = id !== undefined ? SELECT_TABLE('movies', `id=${parseInt(id)}`) : SELECT_TABLE('movies')
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
  try {
    const columnNameQ = COL_NAME('movies')
    const columnNames = (await pool.query(columnNameQ)).rows.map(({ column_name }) => column_name).slice(1)
    const cn = columnNames.map((cn) => {
      if (req.body[cn] === 'movie_cast') {
        return {
          key: cn,
          val: `{${req.body[cn].map((d) => `"${d}"`)}}`
        }
      }
      return {
        key: cn,
        val: req.body[cn]
      }
    })
    const query = await INSERT_TABLE(
      'movies',
      cn.map(({ key }) => key)
    )
    await pool.query(
      query,
      cn.map(({ val }) => val)
    )
    res.send({ message: 'Movie added successfully' })
  } catch (error) {
    res.send({ message: 'Error while adding movie', error })
  }
}

const updateMovie = async (req, res) => {
  const { id } = req.query ?? {}
  try {
    const updateMovieQuery = await UPDATE_TABLE('movies', req.body, `id=${parseInt(id)}`)
    await pool.query(updateMovieQuery, Object.values(req.body))
    res.send({ message: 'Movie updated successfully' })
  } catch (error) {
    res.send({ message: 'Error while updating movie', error })
  }
}
const deleteMovie = async (req, res) => {
  const { id } = req.query ?? {}
  const deleteMovieQuery = DELETE_BY('movies', `id=${parseInt(id)}`)
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
