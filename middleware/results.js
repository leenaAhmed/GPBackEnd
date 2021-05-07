const results = (model) => async(req , res , next)=>{
    let query ;  
    // Copy query
    const reqQuery = {...req.query}
     // Fields to exclude
    const removeFields = ['select' , 'sort' ,'page', 'limit'];
   // Loop   removeFields  delete   from reqQuery
     removeFields.forEach(param => delete reqQuery[param]);
    // Create query string
   let querystr = JSON.stringify(reqQuery)
    // Create operators ($gt, $gte)
   querystr = querystr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

   // Finding resource
   query =  model.find(JSON.parse(querystr))
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
   const total = await  model.countDocuments();

   query = query.skip(startIndex).limit(limit);


 // Executing query
    const result = await query ;

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
    res.results= {
        success: true,
        count: result.length,
        pagination,
        data: result
      };
};
module.exports = results ;