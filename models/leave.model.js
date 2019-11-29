/** User Mongo DB model	*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveSchema = new mongoose.Schema({

    userId : { type: Schema.Types.ObjectId, ref: 'User' },
    date: {type:Object,required: true},
    appliedOn: {type:String,default:null},
    totalDate: {type:Array,default:[]},
    noOfDays: {type:Number},
    shortLeave: {type:Number},
    reason: { type: String, required: true },
    extraHours: {type: String},
    approvedBy: {type: String,default:null},
    status: {type: String, default:'pending'}
});

module.exports = mongoose.model("leave", LeaveSchema);
