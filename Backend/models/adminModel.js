import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required : true, unique: true},
    isSetupComplete: {Boolean, default: false}
});

const adminModel = mongoose.model('Admin', adminSchema)
export {adminModel as Admin}