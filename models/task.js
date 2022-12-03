const mongoose= require('mongoose');

 
const allinfo=new mongoose.Schema({
    maintask:{type:String,required:true},
    subtasks:{type:Array},
    status:{type:String}

})

const alltask = mongoose.model("task&subtask", allinfo)
module.exports=alltask;