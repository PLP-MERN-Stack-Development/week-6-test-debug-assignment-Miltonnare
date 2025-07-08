const mongoose=require('mongoose');



const uri=process.env.MONGO_URI;

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true

}
)
.then(()=>console.log("MongoDB Connected"));
.catch((err)=>console.error('Mongo Connection error', err));
