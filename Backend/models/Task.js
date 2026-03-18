const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
     title:{
        type : String,
        required : [true , 'Title is reqiured'],
        trim : true
     },
     description:{
        type : String,
        trim : true,
        default: '',
     },
     status:{
        type : String ,
        enum:['pending','in-progress','completed'],
        default:'pending',
     },
     priority:{
        type: String,
        enum:['low','medium','high'],
        default:'medium',
     },
}, { timestamps:true});

module.exports = mongoose.model('Task',TaskSchema);