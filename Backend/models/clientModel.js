import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    SNo:{type: Number, require: true},
    Name:{type: String, require: true},
    OverallDebtAmount:{type: Number , required: true},
    debtDate:{type: Date, required: true},
    interestAmount:{ type: Number, required: true},
    Description: {type: String}
})

const clientModels = mongoose.model('Client', clientSchema);
export {clientModels}