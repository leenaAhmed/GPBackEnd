const mongoose = require('mongoose')
const User = require('./user')
const slugify = require('slugify')
 
const MeetingsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        maxlength: [50, 'Name can not be more than 50 characters']
      } ,
      slug: String,
      startDateTime: {
          type: Date,
          default: Date.now() ,          
      } ,
      duration: {
        type: String ,
      },
      file: {
        type: Buffer,     
        } ,
      isExpaired :{
        type: Boolean,
        default: false
      },
      join_url: {
        type: String , 
       }
      , 
      createdAt: {
          type: Date,
          default: Date.now()
      }, 
      recordUrl :{
        type: String
      } 
 })  
MeetingsSchema.pre('save', function(next){
   this.slug = slugify(this.name ,{lower: true})
    next();
})
MeetingsSchema.pre('save', function(next){
     this.duration.split(':') 
    next()

});
module.exports = mongoose.model('Meetings', MeetingsSchema);
