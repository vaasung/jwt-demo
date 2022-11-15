const secureData = (req, res, next) => {
  const { id } = req.query
  if (parseInt(id) <= 10) {
    return res.send({
      message: 'default data cannot update/delete, create new data and manupulate it'
    })
  }
  next()
}

module.exports = {
  secureData
}
