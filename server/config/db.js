const mongoose=require("mongoose")

DB_URL=process.env.MONGO_ATLAS_URL

module.exports=()=>{mongoose.connect(DB_URL)
  .then(() => console.log('Connected!'))
  .catch((err)=>{console.log(err)})
}
