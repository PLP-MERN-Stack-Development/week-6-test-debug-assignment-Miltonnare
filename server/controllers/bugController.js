const Bugs=require('../models/Bug');


const createBug=async (req,res)=>{
    try{
        const {title,description,priority}=req.body;

        const bug=new Bugs({
            title,
            description,
            priority
        });

        await bug.save();
        res.status(200).json(bug)

    }catch(error){
        res.status(400).json({ error: err.message });

    }
};


const getAllBugs=async (req,res)=>{
    try{
        const bugs=await Bugs.find();
        res.json(bugs)

    }
    catch(err){
        console.error(err)

        res.status(500).json({ error: err.message });

    }
};

const getBug=async (req,res)=>{
    try {
        const One=await Bugs.findById(req.params.Id);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

