const ErrorResponse = require('../utils/errorResponse')
const asyncHandler =require('../middleware/async')
const Meeting = require('../models/Meetings')
// @desc      Get all meetings
// @route     GET /api/v1/meetings
// @access    Private
exports.getAllMeetings = asyncHandler(async (req ,res , next) =>{
        const meetings = await Meeting.find()
            res.status(200).json({
                sucsees: true ,
                count: meetings.length ,
                data: meetings
            })
}) ;
// @desc      Get single meetings
// @route     GET /api/v1/meetings:id
// @access    Private
exports.getSingleMeetings = asyncHandler(async (req ,res , next) =>{
   
        const meeting = await Meeting.findById(req.params.id)
        if(!meeting){
            return next(
             new ErrorResponse(`this meeting not found with id ${req.params.id}` , 404)
             );
          }
        res.status(200).json({
                sucsees: true ,
                data: meeting
             })
 
});
// @desc     creat meetings
// @route     Post  /api/v1/meetings
// @access    Private
exports.creatMeeting = asyncHandler(async (req ,res , next) =>{ 
 
        const meeting = await Meeting.create(req.body);
        res.status(200).json({
            sucsees: true ,
            msg: 'creat meetings' ,
            data: meeting
        })
        
    
}) ;
// @desc     delete meetings
// @route     Delete  /api/v1/meetings:id
// @access    Private
exports.deleteMeeting = asyncHandler(async(req ,res , next) =>{

        const meeting = await Meeting.findByIdAndDelete(req.params.id )
        if(!meeting){
            return next(
                new ErrorResponse(`this meeting not found with id ${req.params.id}` , 404)
                );          }
        res.status(200).json({
            sucsees: true ,
            data: {}
        }) 

}) ; 
// @desc     Update meetings
// @route     put  /api/v1/meetings
// @access    Private
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
            sucsees: true ,
            data: meeting
        }) 
  
});
