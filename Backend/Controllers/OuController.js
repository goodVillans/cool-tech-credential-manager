// Include dependencies
const OU = require('../Models/OU');
const User = require('../Models/User');

// Create a new Organizational Unit (OU)
const CreateOU = async (req, res) => {
  try {
    // Fetch user details using user ID from request
    const user = await User.findById({ _id: req.user._id });
    // Check if user has admin role.
    if(user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to perform this action' });
    }
    // Check if an OU with the same name already exists
    const existingOU = await OU.findOne({ name: req.body.name });
    if (existingOU) {
      return res.status(409).json({ message: 'OU already exists' });
    }
    // Define the new OU using the request body
    const newOU = new OU({
      name: req.body.name,
      divisions: req.body.divisions,
    });
    // Save the new OU to the database
    await newOU.save();
    // Respond with success message
    res.json('OU added');
  } catch (err) {
    // In case of any error, return a 400 error message
    res.status(400).json({ message: err.message });
  }
}
// Get all Organizational Unit
const GetOUs = async (req, res) => {
  try {
    // Fetch all OUs from the database
    const OUs = await OU.find();
    // Respond with the list of OUs
    res.json(OUs);
  } catch (err) {
    // In case of any error, return a 400 error message
    res.status(400).json({ message: err.message });
  }
}

// Update an Organizational Unit
const UpdateOU = async (req, res) => {
  try {
    // Fetch user details using user ID from request
    const user = await User.findById({ _id: req.user._id });
    // Check if user has admin role.
    if(user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to perform this action' });
    }
    // Fetch the OU to be updated using its ID from the request params
    const ou = await OU.findById(req.params.id);
    // Update the OU name and divisions
    ou.name = req.body.name;
    ou.divisions = req.body.divisions;
    // Save the updated OU
    await ou.save();
    // Respond with success message
    res.json('OU updated');
  } catch (err) {
    // In case of any error, return a 400 error message
    res.status(400).json({ message: err.message });
  }
}
// Delete an Organizational Unit
const DeleteOU = async (req, res) => {
  try {
    // Fetch user details using user ID from request
    const user = await User.findById({ _id: req.user._id });
    // Check if user has admin role; if not, they are not authorized to perform this operation
    if(user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to perform this action' });
    }
    // Delete the OU using its ID from the request params
    await OU.findByIdAndDelete(req.params.id);
    // Respond with success message
    res.json('OU deleted');
  } catch (err) {
    // In case of any error, return a 400 error message
    res.status(400).json({ message: err.message });
  }  
}

module.exports = {
  CreateOU,
  GetOUs,
  UpdateOU,
  DeleteOU,
}
