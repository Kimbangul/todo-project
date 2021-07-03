const TodoDB = require("../models/todo_db");
const express = require("express");
const router = express.Router();

router.post("/", async(req, res) => {
    try{
        const todo = await new TodoDB(req.body).save();
        res.send(todo);
    }catch(err){
        res.send(err);
    }
});

router.get("/",async(req,res) => {
    try{
        const todos = await TodoDB.find();
        res.send(todos);
    }catch(err){
        res.send(err);
    }
});

router.put("/:id", async(req,res) => {
    try{
        const todo = await TodoDB.findOneAndUpdate(
            {_id : req.params.id},
            req.body
        );
        res.send(todo);
    }catch(err){
        res.send(err)
    }
});

router.delete("/:id",async(req,res) => {
    try{
        const todo = await TodoDB.findByIdAndDelete(req.params.id);
        res.send(todo);
    }catch(err){
        res.send(err);
    }
});


module.exports = router;

