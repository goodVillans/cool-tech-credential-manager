require('dotenv').config();
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
// move to .env
const SECRET = process.env.SECRET; 

// create JWT
const createToken = (_id, role) => {
    return jwt.sign({_id, role}, SECRET, { expiresIn: '1d' })
};

// reguster new user
const UserRegister = async (req, res) => {
    // Get values from the body
    const { username, password, email, name } = req.body;
    try {
        const user = await User.register( username, password, email, name);
        // create token
        const token = createToken(user._id, user.role);
        // response
        res.status(201).json({ user: user, token: token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// login existing user
const UserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        // create token
        const token = createToken(user._id, user.role);
        // response
        res.status(200).json({ user: user, token: token });
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
};

// find single user
const findUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update user
const updateUser = async (req, res) => {
    try {
        const result = await User.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        // check if not modified
        if (result.nModified === 0) {
            return res.status(404).json({message: 'No user found or no update was made'});
        }
        const updatedUser = await User.findById(req.params.id);
        if(!updatedUser){
            return res.status(404).json({message: 'Error fetching the updated user'});
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { 
   UserRegister, 
   UserLogin,
   findUserById,
   updateUser
 };
