const mongoose=require('mongoose')
exports.connectDB=()=>{
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/Auth')
        console.log("DB connect")
    } catch (error) {
        console.log("error in DB connect")
    }
}