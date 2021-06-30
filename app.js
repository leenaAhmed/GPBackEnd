const express =require('express')
const dotenv =require('dotenv')
const morgan = require('morgan');
var cors = require('cors')
const colors = require('colors')
const cookieParser =require('cookie-parser') ;
const loggar =require('./middleware/logger')
const errorHandler =require('./middleware/error')
const connectDB = require('./config/db')
// load env
const app = express();
dotenv.config({path:'./config/config.env'}) 

connectDB();

app.use(cors());


app.use(express.json());

const meetings =require('./routes/meetings')
const auth =require('./routes/auth')
const users =require('./routes/users')



// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  
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
const PORT = process.env.PORT ||3000
app.listen(PORT , ()=>{
    console.log(`Server running  in mode on port ${PORT}`)
}) 
// handel  promis rejaction
process.on('unhandledRejection' ,(err, promise)=>{
    console.log(`Error: ${err.message}`)
})
