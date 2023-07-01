const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OUSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  divisions: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Division' 
  }]
}, { timestamps: true });

const OU = mongoose.model('OU', OUSchema);

module.exports = OU;
