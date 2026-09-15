const jwt = require('jsonwebtoken');
const JWT_N = "mynameis$madi"

const fetchuser= (req,res,next)=>{
   const token = req.header("auth-token"); 
   if(!token){
   return res.status(401).send({error:"Please authenticate using a valid token"});
   }
   try {
    const data = jwt.verify(token,JWT_N);
   req.user = data.user;
    next();
   }catch  {
    return res.status(401).send({error:"Please authenticate using a valid token"});
   }
}  
module.exports = fetchuser;