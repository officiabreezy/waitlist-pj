const dotenv = require('dotenv').config();

const requireAPIkey =(req,res,next) => {
  const apiKey = req.query.api_key;

   if(apiKey=== process.env.USER_API_KEY){
    return next();
   } else {
    return res.status(401).json({ message: 'Unauthorized:Invalid API key'});
   }
};

module.exports = requireAPIkey;