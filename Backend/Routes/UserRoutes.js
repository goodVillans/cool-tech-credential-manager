const express = require('express');
const router = express.Router();
const { UserRegister, UserLogin, findUserById, updateUser } = require('../Controllers/UserController');
const {requireAuth, requireNormalUserAuth, requireAdminUserAuth} = require('../Middleware/requireAuth');

router.post('/register', UserRegister);

router.post('/login', UserLogin);

router.get('/:id', findUserById);

router.put("/:id",  updateUser);
 
module.exports = router;
