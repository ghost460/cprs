const ascynHandlar = (requestHandlar)=>{
   return(req, res, next)=>{
    Promise.resolve(requestHandlar(req,res, next)).catch((err)=>next((err)))
   } 
}
export {ascynHandlar}