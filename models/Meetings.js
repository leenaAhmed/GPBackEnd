const mongoose = require('mongoose')

const MeetingsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
      } ,
      slug: String,
      startDateTime: {
          type: String,
          required: [true, 'Please add a data'],
          unique: true,
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
      location: {
          // GeoJSON Point
          type: {
            type: String,
            enum: ['Point']
          },
          coordinates: {
            type: [Number],
            index: '2dsphere'
          },
          formattedAddress: String,
          street: String,
          city: String,
          state: String,
          zipcode: String,
          country: String
        },
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
})
module.exports = mongoose.model('Meetings', MeetingsSchema);
