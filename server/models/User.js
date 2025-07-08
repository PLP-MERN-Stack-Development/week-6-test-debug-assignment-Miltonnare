const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        first:{type:String, required:true},
        last:{type:String,trim:true}
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('User',userSchema);