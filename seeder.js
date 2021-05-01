const fs = require('fs');
const mongoose = require('mongoose');
const dotenv =require('dotenv')
const colors = require('colors') 

// Load env vars
dotenv.config({path:'./config/config.env'}) 

// Load models
const Meeting = require('./models/Meetings');

// load database
mongoose.connect(process.env.MONG_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const meetings = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/meetings.json`, 'utf-8')
);
// Import into DB
const importData = async () => {
  try {
    await Meeting.create(meetings);
  
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Meeting.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
