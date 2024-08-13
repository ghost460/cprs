const ascynHandlar = (requestHandlar)=>{
   (req, res, next)=>{
    Promise.resolve(requestHandlar(req,res, next)).catch((err)=>next((err)))
   } 
}
export {ascynHandlar}