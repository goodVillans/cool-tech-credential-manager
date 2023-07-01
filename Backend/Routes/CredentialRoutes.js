const express = require('express');
const router = express.Router();
const { 
      requireAuth,
      requireNormalUserAuth, 
      requireManagerUserAuth, 
      requireAdminUserAuth } = require('../Middleware/requireAuth');
const {
    createCredential,
    getCredentials,
    updateCredentialinUserCredential,
    UpdateUserCredentialInfo,
} = require('../Controllers/CredentialController');

router.use(requireAuth);

// view a division's credential Repo
// no role auth needed
router.get(
      '/',
      requireNormalUserAuth,
      getCredentials
);

// add a credential to a specific credential Repo
// no role auth needed
router.post(
      '/:id',  
      requireNormalUserAuth,
      createCredential
);

// Update a specific credential(main credential has credential array);
// role needs to be manager or admin
router.put(
      '/:id', 
      requireManagerUserAuth,
      updateCredentialinUserCredential
);
// update the main user credential(main user credential)
// needs to be admin
router.put(
      '/user-credential/:id',
      requireAdminUserAuth,
      UpdateUserCredentialInfo
);

module.exports = router;
