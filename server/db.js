const mongoose = require("mongoose");

module.exports = async () => {
    try{
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        };

        
        await mongoose.connect(
            "mongodb+srv://sejin:rewq8529@cluster0.v7ts6.mongodb.net/todolist?retryWrites=true&w=majority",
            connectionParams
        );
        console.log("Connected to database.");
    }catch(err){
        console.log("Could not connect to datavase.",error);
    }
}