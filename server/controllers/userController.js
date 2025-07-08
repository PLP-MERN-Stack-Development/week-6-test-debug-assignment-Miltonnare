
const User=require('../models/User');

 const registerUsers= async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name||!email||!password){
            return res.status(400).json({message:'All fields are required.'})
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message:'Email already Registered.'})
        }

        const newUser= new User({
            name,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({message:'Registered Succesfully'})

     
    }catch(error){
        console.error(error)
         res.status(500).json({ message: 'Server error.' });

    }

};

const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find();
        res.json(users);
    } catch (error) {
        console.error(error)
        res.status(500).json({message:error});
        
    }

};

const getUser=async (req,res)=>{
    try {

        const One=await User.findById(req.params.id);
        if(!One){
            return res.status(404),json({error:'User Not Found'})
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:error})
        
    }
};

module.exports={registerUsers,getAllUsers,getUser};