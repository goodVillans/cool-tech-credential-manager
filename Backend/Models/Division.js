const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const DivisionSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  OU: { 
    type: Schema.Types.ObjectId, 
    ref: 'OU', 
    required: true 
  },
  credentials: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Credential' 
  }]
},{ timestamps: true });

const Division = mongoose.model('Division', DivisionSchema);

module.exports = Division;
