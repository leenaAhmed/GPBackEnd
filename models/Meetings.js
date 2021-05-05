const mongoose = require('mongoose')
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
      duration: {
          type: Number ,
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
        },  acceptGi: {
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
          required: true
        },
        recordUrl :{
          type: String
        }
        // populate
})
MeetingsSchema.pre('save', function(next){
   this.slug = slugify(this.name ,{lower: true})
    next();
})
module.exports = mongoose.model('Meetings', MeetingsSchema);
