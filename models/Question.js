const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// MOdel - Question Support

const Question = new Schema({
    

    email: {
       type: String,
        require: true
    },

    question: {
        type: String,
         require: true
     },


    date: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model("question", Question);