const mongoose = require('mongoose');
const {Schema} = mongoose;

const ApplicantSchema = new Schema({
  name:{
type:String,
required:true
  },

  birthDate:{
type:Date,
required:true
  },
  
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  requirements: String,
  category: {
    type: String,
    enum: ["看護師", "介護士", "相談支援員", "その他"],
    required: true
  }
});

module.exports = mongoose.model('Applicant', ApplicantSchema);
