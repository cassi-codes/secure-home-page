const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;
const {Schema} = mongoose;
const adminSchema = new Schema();

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin',adminSchema);