let mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
        /*id:Number,*/
        task: String,
        description: String,

})


const List = mongoose.model('list',ListSchema)

module.exports = List