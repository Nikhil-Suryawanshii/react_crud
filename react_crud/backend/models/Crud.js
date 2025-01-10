const mongoose = require('mongoose')

const CrudSchema = new mongoose.Schema({
    crud: String
})

const CrudModel = mongoose.model("student",CrudSchema)
module.exports = CrudModel