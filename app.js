const express =require('express')
const dotenv =require('dotenv')
const morgan = require('morgan');
const colors = require('colors')
const cookieParser =require('cookie-parser') ;
const loggar =require('./middleware/logger')
const errorHandler =require('./middleware/error')
const connectDB = require('./config/db')
// load env
dotenv.config({path:'./config/config.env'}) 
// load connectDB
connectDB();

// file routes 
const meetings =require('./routes/meetings')
const auth =require('./routes/auth')
const users =require('./routes/users')

const app = express();

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
// logger
app.use(loggar)

// routers

app.use('/api/v1/meetings' , meetings)
app.use('/api/v1/auth' , auth) 
app.use('/api/v1/users', users);


// error handler
app.use(errorHandler)

// cookie-parser 
app.use(cookieParser);

// listining to the port
const PORT = process.env.PORT|3000
app.listen(PORT , ()=>{
    console.log(`Server running  in mode on port ${PORT}`)
}) 
// handel  promis rejaction
process.on('unhandledRejection' ,(err, promise)=>{
    console.log(`Error: ${err.message}`)
})
