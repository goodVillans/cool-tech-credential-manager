const Division = require('../Models/Division');
const User = require('../Models/User');

// Create Division
const createDivision = async (req, res) => {
   const user = await User.findById(req.user._id);
   if (user.role !== 'admin' && user.role !== 'manager') {
       return res.status(403).send({ message: 'Unauthorized to perform this action' });
   }
    const division = new Division({
        name: req.body.name,
        ou: req.body.ou,
        users: req.body.users || [],
    });

    try {
        await division.save();
        res.status(201).json(division);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Get Division
const getDivision = async (req, res) => {
   const user = await User.findById(req.user._id);
   if (user.role !== 'admin') {
       return res.status(403).send({ message: 'Unauthorized to perform this action' });
   }
    try {
        const division = await Division.findById(req.params.id).populate('users');
        res.json(division);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Update Division
const updateDivision = async (req, res) => {
   const user = await User.findById(req.user._id);
   if (user.role !== 'admin' && user.role !== 'manager') {
       return res.status(403).send({ message: 'Unauthorized to perform this action' });
   }
    try {
        const division = await Division.findById(req.params.id);
        if (req.body.name != null) {
            division.name = req.body.name;
        }
        if (req.body.ou != null) {
            division.ou = req.body.ou;
        }
        if (req.body.users != null) {
            division.users = req.body.users;
        }
        await division.save();
        res.json(division);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Delete Division
const deleteDivision = async (req, res) => {
   const user = await User.findById(req.user._id);
   if (user.role !== 'admin') {
       return res.status(403).send({ message: 'Unauthorized to perform this action' });
   }
    try {
        await Division.findByIdAndDelete(req.params.id);
        res.json({ message: 'Division deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// List Divisions
const getDivisions = async (req, res) => {
    try {
      // Fetch all divisions from the database
      const divisions = await Division.find();
      // Respond with the list of divisions
      res.json(divisions);
    } catch (err) {
      // In case of any error, return a 400 error message
      res.status(400).json({ message: err.message });
    }
  }
// Assign User to Division
const AssignUser = async (req, res) => {
   const user = await User.findById(req.user._id);
   if (user.role !== 'admin') {
      return res.status(403).send({ message: 'Unauthorized to perform this action' });
   }
   try {
    const division = await Division.findById(req.params.divisionId);
    const user = await User.findById(req.params.userId);
    //   check if user is already asssigned to division
    if (division.users.includes(user._id)) {
        return res.status(400).json({ message: 'User already assigned to division' });
    }
    division.users.push(user);
    await division.save();
    res.json(division);
   } catch (err) {
    res.status(500).json({ message: err.message });
   }
};
// Remove User from Division
const RemoveUser = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user.role !== 'admin') {
         return res.status(403).send({ message: 'Unauthorized to perform this action' });
    }
    try {
        const division = await Division.findById(req.params.divisionId);
        division.users = division.users.filter(
            (userId) => userId.toString() !== req.params.userId
        );
        await division.save();
        res.json(division);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createDivision,
    getDivision,
    updateDivision,
    deleteDivision,
    getDivisions,
    AssignUser,
    RemoveUser,
};
