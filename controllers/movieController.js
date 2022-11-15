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
  if (req.body.id) {
    return res.send({ message: 'ID not editable' })
  }
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

const seedsMovie = async (req, res) => {
  const q = `INSERT INTO movies (movie_name, movie_rating, movie_cast, movie_genre, movie_release_date)
    VALUES
    ('Orphan: First Kill',	7,	'{"Isabelle Fuhrman","Julia Stiles","Rossif Sutherland","Matthew Finlan","Hiro Kanagawa"}',	'Horror',	'2022-07-27 00:00:00 +0000'),
    ('Fall',7,	'{"Grace Caroline Currey","Virginia Gardner","Jeffrey", "Dean Morgan","Mason Gooding","Dan Southworth"}',	'Thriller',	'2022-08-12 00:00:00 +0000'),
    ('Blade of the 47 Ronin',	7,	'{"Anna Akana","Mark Dacascos","Teresa Ting","Dustin Nguyen","Dan Southworth"}',	'Fantasy',	'2022-10-25 00:00:00 +0000'),
    ('All Quiet on the Western Front',	8,	'{"Felix Kammerer","Albrecht Schuch","Aaron Hilmer","Edin Hasanović","Devid Striesow"}',	'Action',	'2022-10-28 00:00:00 +0000'),
    ('MexZombies',	7,	'{"Bárbara de Regil","Iñaki Godoy","Sara Maldonado","Mayra Batalla"}',	'Action',	'2022-10-26 00:00:00 +0000'),
    ('Black Adam',	6,	'{"Dwayne Johnson","Aldis Hodge","Noah Centineo","Sarah Shahi"}',	'Action', 	'2022-10-21 00:00:00 +0000'),
    ('Terrifier 2',	6,	'{"Lauren LaVera","David Howard Thornton","Elliott Fullam","Casey Hartnett"}',	'Horror',	'2022-10-06 00:00:00 +0000'),
    ('Black Panther: Wakanda Forever',	7,	'{"Letitia Wright","Lupita Nyong o","Danai Gurira","Winston Duke"}',	'Science Fiction',	'2022-11-11 00:00:00 +0000'),
    ('Jeepers Creepers: Reborn',	5,	'{"Letitia Wright","Lupita Nyong o","Danai Gurira","Winston Duke"}',	'Mystery',	'2022-09-15 00:00:00 +0000'),
    ('Enola Holmes 2',	8,	'{"Millie Bobby Brown","Henry Cavill","Louis Partridge","Helena Bonham Carter","David Thewlis"}',	'Crime',	'2022-11-04 00:00:00 +0000')
    `
  try {
    await pool.query(q)
    res.send({ message: 'Data added' })
  } catch (error) {
    res.send({ Error: error })
  }
}

module.exports = {
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  seedsMovie
}
