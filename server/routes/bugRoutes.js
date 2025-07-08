const express=require('express');
const router=express.Router;

const bugController=('../controllers/bugController');

router.post('/', bugController.createBug);
router.get('/',bugController.getAllBugs);
router.get('/',bugController.getBug);

module.exports={router};
