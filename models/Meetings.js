const mongoose = require('mongoose')
const path = require('path');
const slugify = require('slugify')
const MeetingsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
      } ,
      slug: String,
      startDateTime: {
          type: String,
          required: [true, 'Please add a data'],
          match: [
              /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})Z$/g
              , 'invalid date'
          ]
      } ,
      isExpaired :{
        type: Boolean,
        default: false
      },
      duration: {
          type: Number ,
          required: [true, 'Please add a time'],
          match: [
              /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gm ,
              'invalid time' 
          ]
      }  ,
      join_url: {
        type: String , 
      }
      ,
      file: {
          type: String,
          default: 'no-file.pdf'
        },   
      housing: {
          type: Boolean,
          default: false
        },
       jobAssistance: {
          type: Boolean,
          default: false
        },
        jobGuarantee: {
          type: Boolean,
          default: false
        }, 
         acceptGi: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
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
       ]
    
        // populate
})
MeetingsSchema.pre('save', function(next){
   this.slug = slugify(this.name ,{lower: true})
    next();
})
module.exports = mongoose.model('Meetings', MeetingsSchema);
