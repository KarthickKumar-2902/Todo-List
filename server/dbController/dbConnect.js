// const { default: mongoose } = require('mongoose')
const mongoose = require('mongoose')

const mongo_url = "mongodb+srv://user:user@kk-sece.hvhc0cp.mongodb.net/Todo"


const dbConnect = async() => {

    try{
        return await mongoose.connect(mongo_url).then(ref => console.log("Successfully Connected"))
    }
    catch(error){
        console.log(error)
        return console.log("Connection Failed");
    }
}
    

module.exports ={
    dbConnect
};