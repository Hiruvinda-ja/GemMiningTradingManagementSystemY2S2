const express=require('express')
const cors=require('cors');
const{db}=require('./db//db');
const{readdirSync}=require('fs')//*
const app=express();

//const path = require('path');



require('dotenv').config()

const PORT=process.env.PORT

//middleware
app.use(express.json())
app.use(cors())


app.use('/uploads', express.static('uploads'));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes
readdirSync('./Route').map((route)=>app.use('/api/v1',require('./Route/'+route)))

app.get('/',(req,res)=>{//for postman check
    res.send('Hello world')
})


const server=()=>{
    db()//connect db
    app.listen(PORT,()=>{
        console.log('listening to port:',PORT);
    })
    
}
server()
