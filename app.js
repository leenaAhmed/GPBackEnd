const express =require('express')
const dotenv =require('dotenv')
const colors = require('colors')
const meetings =require('./routes/meetings')
const auth =require('./routes/auth')
const loggar =require('./middleware/logger')
const errorHandler =require('./middleware/error')
const connectDB = require('./config/db')
// load env
dotenv.config({path:'./config/config.env'}) 
// load connectDB
connectDB();

const app = express()
//  
app.use(express.json())
// logger
app.use(loggar)

// routers
app.use('/api/v1/meetings' , meetings)
app.use('/api/v1/auth' , auth) 


// error handler
app.use(errorHandler)

// listining to the port
const PORT = process.env.PORT|3000
app.listen(PORT , ()=>{
    console.log(`Server running ${process.env.NODE_ENV} in mode on port ${PORT}`)
}) 
// handel  promis rejaction
process.on('unhandledRejection' ,(err, promise)=>{
    console.log(`Error: ${err.message}`)
})
