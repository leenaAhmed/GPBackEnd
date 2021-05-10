const ErrorResponse = require('../utils/errorResponse')
const asyncHandler =require('../middleware/async')
const Meeting = require('../models/Meetings');
  
exports.getSechdule = asyncHandler(async (req ,res , next) =>{
 
     res.status(200).json(res.results)
}) ;
//  past 
exports.expirationDate = asyncHandler(async (req , res , next)=>{
        
  await Meeting.updateMany({startDateTime:{$lt: new Date(Date.now)}},{isExpaired: true});
  const getPast = await Meeting.find({isExpaired: false}).sort({createdAt: -1}).select('startDateTime')
      console.log(` past data ${{$lt: new Date(Date.now)}}`)
})
 
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
