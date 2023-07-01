const express = require('express');
const router = express.Router();

const { requireAuth } = require('../Middleware/requireAuth');

// controller Functions
const {
  CreateOU,
  GetOUs,
  UpdateOU,
  DeleteOU,
} = require('../Controllers/OuController');

// 
router.use(requireAuth);

// create a new OU
router.post(
  '/create',  
  CreateOU  
);
// get all OUs
router.get(
  '/', 
  GetOUs
);
// update a specific OU
router.put(
  '/update/:id', 
  UpdateOU
);
// delete a specific OU
router.delete(
  '/delete/:id', 
  DeleteOU
);

module.exports = router;
