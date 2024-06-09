const express =require('express')
const app =express()
const cors = require('cors')
const router =require('./route')
const mongoose= require('mongoose')
mongoose.connect('mongodb://localhost:27017/todo').then(()=>{
    console.log("mongodb connected")
}).catch((err)=>{
    console.log(err);
})

app.use(express.json())
app.use(cors())

  app.get('/',(req,res)=>{
      res.send("hello World")
 })
app.use('/',router)
app.listen(5000,()=>{
    console.log("connected");
})