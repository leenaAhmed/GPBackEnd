const  ErrorResponse = require('../utils/errorResponse')
const  asyncHandler =require('../middleware/async')
const  Meeting = require('../models/Meetings');
const  multer  = require('multer')
// const  upload = multer({ dest: process.env.UPLOAD_PATH})
  
exports.getMeetings = asyncHandler(async (req ,res , next) =>{
     await Meeting.updateMany({startDateTime:{$lt: new Date(Date.now())}}, {isExpaired: true}).sort({createdAt: -1});
      
      res.status(200).json(res.results)
}) ;


exports.getSingleMeetings = asyncHandler(async (req ,res , next) =>{
   
        const meeting = await Meeting.findById(req.params.id)
        if(!meeting){
            return next(
             new ErrorResponse(`this meeting not found with id ${req.params.id}` , 404)
             );
          }
        res.status(200).json({
                success: true ,
                data: meeting
             })
 
});
 
exports.creatMeeting = asyncHandler(async (req ,res , next) =>{
    const meeting = await Meeting.create(req.body);
    const  {startDateTime} = req.body 
    const expairedDate = Date.parse(startDateTime)
       if(expairedDate < Date.now()){
        return next(
            new ErrorResponse(`this is expaired date inter inavlid date` , 400)
            );
       }
        res.status(200).json({
            success: true ,
            msg: 'creat meetings' ,
            data: meeting
        })
         
}) ;
 
 
exports.deleteMeeting = asyncHandler(async(req ,res , next) =>{

        const meeting = await Meeting.findByIdAndDelete(req.params.id )
        if(!meeting){
            return next(
                new ErrorResponse(`this meeting not found with id ${req.params.id}` , 404)
                );          }
        res.status(200).json({
            success: true ,
            data: {}
        }) 

}) ; 
  
exports.updateMeeting = asyncHandler(async(req ,res , next) =>{ 
 
        const meeting = await Meeting.findByIdAndUpdate(req.params.id ,req.body , {
            new: true ,
            runValidators: true
        })
        if(!meeting){
            return next(
                new ErrorResponse(`this meeting not found with id ${req.params.id}` , 404)
                );       
           }
        res.status(200).json({
            success: true ,
            data: meeting
        }) 
  
});

exports.creatMeetingNow = asyncHandler(async (req ,res , next) =>{ 
   
     const meeting = await Meeting.create({
      name: req.body.name
    });

      res.status(200).json({
         success: true ,
         msg: 'creat meetings now' ,
         data: meeting
     })
}) ;

 
const filestorageEngine = multer.diskStorage({
    destination: function (req, file, cb ) {
      cb(null, "./uploads")
    },
    filename: function(req, file, cb ) { 
       req.file = file 
      cb(null, file.fieldname + '--' + Date.now())
    }
  }) 
const upload = multer({ storage: filestorageEngine })

exports.uploadHandler = upload.single("image");

exports.afterUploadFile = function(req, res, next ) {
     console.log('file' , JSON.stringify(req.file))
    console.log('path' , req.file.path )
     res.status(200).json({
      success: true ,   
     })  
  };