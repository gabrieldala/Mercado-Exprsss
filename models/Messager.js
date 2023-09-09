const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// MOdel - Messagens

const Messager = new Schema({
    

    room: {
        type: String,
        require: true
    },

    username: {
       type: String,
        require: true
    },

    text: {
        type: String,
         require: true
     },

     createdAt: {
        type: String,
         require: true
     },


    date: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model("messagers", Messager);