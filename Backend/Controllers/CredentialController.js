const Credential = require('../models/Credential');
const User = require('../Models/User');

// Get all credentials
const getCredentials = async (req, res) => {
    try {
        const credentials = await Credential.find()
         //Populate the user, division, and OU fields with needed data from each object
        .populate('user', 'name email role')
        .populate('division', 'name')
        .populate('OU', 'name');
        res.json(credentials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
 };

// Add a new credential to a user's credentials
const createCredential = async (req, res) => {
        try {
            // Find the existing Credential document for the user
            const credential = await Credential.findOne({ credential: req.params._id });

            if(!credential){
                return res.status(404).json({ message: 'Credential not found' });
            }
            // Push the new credential info into the credentials array
            credential.credentials.push({
                username: req.body.username,
                password: req.body.password,
            });
            await credential.save();
            res.status(201).json(credential);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
 };
  
// Delete a credential
const deleteCredential = async (req, res) => {
    try {
        await Credential.updateOne(
            { credential: req.params._id },
            { $pull: { credentials: { username: req.body.username, password: req.body.password } } }
        );
        res.json({ message: 'Credential deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
 };

// Update a credential
const updateCredentialinUserCredential = async (req, res) => {
    try {
        // Pull out the old credential
        await Credential.updateOne(
            { _id: req.params._id },
            { $pull: { credentials: { username: req.body.oldUsername, password: req.body.oldPassword } } }
        );
        // Push in the new credential
        await Credential.updateOne(
            { _id: req.params._id },
            { $push: { credentials: { username: req.body.newUsername, password: req.body.newPassword } } }
        );
        res.json({ message: 'Credential updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// This updates the users main credential info for this application and does    not include their sub credentials 
const UpdateUserCredentialInfo = async (req, res) => {
    try {
        const updatedCredential = await Credential.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true },
            );
        if(!updatedCredential){
            return res.status(404).json({message: 'could not update user'})
        }
        res.status(200).json(updatedCredential);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).json({message: err.message});
    } 
}

module.exports = {
   createCredential,
   getCredentials,
   updateCredentialinUserCredential,
   UpdateUserCredentialInfo,
   deleteCredential,
};
