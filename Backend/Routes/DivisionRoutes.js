const express = require('express');
const router = express.Router();
const { requireAuth } = require('../Middleware/requireAuth');
const {
  createDivision,
  getDivision,
  updateDivision,
  deleteDivision,
  getDivisions,
  AssignUser,
  RemoveUser,
} = require('../Controllers/DivisionController');

router.use(requireAuth);

router.post(
  '/create', 
  createDivision
);

router.get(
  '/:id', 
  getDivision
);

router.put(
  '/update/:id', 
  updateDivision
);

router.delete(
  '/delete/:id', 
  deleteDivision
);

router.get(
  '/', 
  getDivisions
);

router.post(
  '/assign-user/:divisionId/:userId', 
    AssignUser
);

router.delete(
  '/remove-user/:divisionId/:userId', 
  RemoveUser
);

module.exports = router;
