const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// MOdel - Salas de conversa

const Room = new Schema({
    

    room: {
        type: String,
        require: true
    },

    username: {
       type: String,
        require: true
    },

    socket_id: {
        type: String,
         require: true
     },

    date: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model("rooms", Room);