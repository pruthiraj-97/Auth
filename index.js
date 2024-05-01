const express=require('express')
const app=express()
const PORT=4000
app.use(express.json())
const {connectDB}=require('./DataBase')
const {signUp,forgotPassword,login}=require('./controller')
app.post('/api/signup',signUp)
app.post('/api/login',login)
app.post('/api/forgotpassword',forgotPassword)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
connectDB()