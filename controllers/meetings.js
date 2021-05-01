const ErrorResponse = require('../utils/errorResponse')
const asyncHandler =require('../middleware/async')
const Meeting = require('../models/Meetings');
 // @desc      Get all meetings
// @route     GET /api/v1/meetings
// @access    Private
exports.getAllMeetings = asyncHandler(async (req ,res , next) =>{
    let query ;  
     // Copy query
     const reqQuery = {...req.query}
      // Fields to exclude
     const removeFields = ['select' , 'sort' ,'page', 'limit'];
    // Loop over removeFields and delete them from reqQuery
      removeFields.forEach(param => delete reqQuery[param]);
     // Create query string
    let querystr = JSON.stringify(reqQuery)
     // Create operators ($gt, $gte)
    querystr = querystr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
 
    // Finding resource
    query =  Meeting.find(JSON.parse(querystr))
  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  // Sort fields 
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }
  // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await  Meeting.countDocuments();

    query = query.skip(startIndex).limit(limit);

 
  // Executing query
     const meetings = await query ;
 
  // Pagination result
     const pagination = {};  
     if (endIndex < total) {
       pagination.next = {
         page: page + 1,
         limit
       };
     }
    // previous meeting
     if (startIndex > 0) {
       pagination.prev = {
         page: page - 1,
         limit
       };
     }
       
     res.status(200).json({
                sucsees: true ,
                count: meetings.length ,
                pagination ,
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
