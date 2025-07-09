const express=require('express');
const router = express.Router();

const userController=require('../controllers/userController');

router.post('/',userController.registerUsers);

router.get('/',userController.getAllUsers);

router.get('/:id',userController.getUser);

router.post('/login', userController.loginUser);

module.exports=router;