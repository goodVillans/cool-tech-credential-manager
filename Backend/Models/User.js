const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String, 
        required: true 
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
        lowercase: true 
    },
    name: {
        type: String, 
        required: true 
    },
    role: {
        type: String,
        default: 'normal',
        enum: ['normal', 'manager', 'admin'] 
    },
    divisions: [{
        type: Schema.Types.ObjectId, 
        ref: 'Division' 
    }],
    OU: [{
        type: Schema.Types.ObjectId, 
        ref: 'OU' 
    }]
}, { timestamps: true });

// register static fnction
UserSchema.statics.register = async function (username, password, email, name) {
    const user = this;
    // Field validation
    if (!email || !password || !username || !name) {
        throw new Error('All fields are required');
    }
    // check password 
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol');
    }
    // check email does not exist
    const userExists = await user.findOne({ email });
    // throw error if email exists
    if (userExists) {
        throw new Error('User with that email already exists');
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // save user
    const newUser = await new user({email, password: hash, username, name}).save();
    return newUser;
}

// static login function
UserSchema.statics.login = async function (email, password) {
    // check email and password are not empty
    if (!email || !password) {
        throw new Error('All fields are required');
    }
    // check email exists
    const user = await this.findOne({ email });
    // check if user exists
    if (!user) {
        throw new Error('User does not exist');
    }
    // check password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error('Incorrect password');
    }
    return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
