const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for credential Information
const CredentialInfoSchema = new Schema({
  username: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
});
// usercredential schema is a refferential object storing only references to existing values (this structure sees to the intergirty of the other collection data). 
const CredentialSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  credentials: [CredentialInfoSchema],
  division: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Division', 
    required: true 
  }],
  OU: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'OU', 
    required: true 
  }]
}, { timestamps: true });

const Credential = mongoose.model('Credential', CredentialSchema);

module.exports = Credential;
