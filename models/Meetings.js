const mongoose = require('mongoose')
const path = require('path');
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
      isExpaired :{
        type: Boolean,
        default: false
      },
      duration: {
          type: Number ,
           match: [
              /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gm ,
              'invalid time' 
          ] ,
          min:  [5, ' no meeting less than 5 Minutes']
      }  ,
      join_url: {
        type: String , 
       }
      ,
      file: {
          type: String,
          default: 'no-file.pdf'
        }, 
        createdAt: {
          type: Date,
          default: Date.now()
      },   
      createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
       },
      recordUrl :{
        type: String
      } ,
      participants : [
      {
        type: mongoose.Schema.ObjectId,
        ref:'User'
      }
     ],  

 })
MeetingsSchema.pre('save', function(next){
   this.slug = slugify(this.name ,{lower: true})
    next();
})
module.exports = mongoose.model('Meetings', MeetingsSchema);
