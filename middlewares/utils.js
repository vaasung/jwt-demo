const secureData = (req, res, next) => {
  const { id } = req.query
  if (parseInt(id) <= 10) {
    return res.send({
      status: 304,
      message: 'Default data cannot update/delete, <strong>Create new data and manupulate it</strong>'
    })
  }
  next()
}

module.exports = {
  secureData
}
