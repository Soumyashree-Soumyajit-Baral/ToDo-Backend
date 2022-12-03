const express=require("express")
const mongoose=require("mongoose")
const ejs=require("ejs")
const taskModel=require("./models/task")
const app=express()

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Setting up the ejs(embeded javascript) as templating engine to render the data on the webpage dynamically.
app.set("view engine","ejs")

//started server at 5000 port
app.listen(5000,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("server is running on 5000 port")
    }
})

//Connected to database
mongoose.connect("mongodb://localhost/task&subtask",()=>{
    console.log("connected to db")
},(err)=>{
    console.log(err)
})

//Creating task and it's subtasks.
app.post("/add", (req, res)=>{
    let stasks=req.body.subtasks
    console.log(stasks)
    if(stasks.length===0){
        taskModel.create({
            maintask:req.body.maintask,
            subtasks:stasks,
            status:"done"
        }).then((data)=>{
            res.status(200).send(data)
        }).catch((err)=>{
            res.status(400).send(err.message)
        })
    }else{
        console.log(stasks.length)
        taskModel.create({
            maintask:req.body.maintask,
            subtasks:stasks,
            status:"pending"
        }).then((data)=>{
            res.status(200).send(data)
        }).catch((err)=>{
            res.status(400).send(err.message)
        })
    }
})


//Delete API
app.delete("/deletetask",(req,res)=>{
    taskModel.deleteOne({maintask:req.body.maintask}).then(()=>{
        res.status(200).send("task deleted sucessfully")
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
})
//Delete through query parameters
app.delete("/delete/:id",(req,res)=>{
    taskModel.deleteOne({maintask:req.params.id}).then(()=>{
        res.status(200).send("task deleted sucessfully")
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
})



//Get API to get all the task and sub tasks.
app.get("/alltask",(req,res)=>{
    taskModel.find().then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
})
//Get API to render all the tasks and their subtasks dynamically on the webpage using ejs as templating engine.
app.get("/all",(req,res)=>{
    taskModel.find().then((data)=>{
        res.render('alltask',{taskdata:data})
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
})