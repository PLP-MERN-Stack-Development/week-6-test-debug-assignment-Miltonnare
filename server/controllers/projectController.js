
const Project=require('../models/Project');


const createProject=async (req,res)=>{
    try {
        const {title,description,createdBy}=req.body

        const Projo=new Project({
            title,
            description,
            createdBy
        });

        await Projo.save();

        res.status(201).json(Projo);

        
    } catch (error) {
        console.error(error)
        res.status(400).json({error:err.message});
        
    }
};

const getAllProjects = async (req, res) => {
  try {
    const maprojo = await Project.find();
    res.status(200).json(maprojo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getProject=async (req,res)=>{
    try {
        const One=await Project.findById(req.params.id);
        if (!One) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(One)
        
    } catch (error) {

        console.error(error);
        res.status(500).json({error:error.message})
        
    }
}

module.exports = { createProject, getAllProjects, getProject };
