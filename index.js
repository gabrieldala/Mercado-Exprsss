const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
// const favicon = require("serve-favicon");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// ROUTAS EXTERNAS
const pagesRouter = require("./pages/pagesRouter");

// BANCOS DE DADOS CARREGADOS
require("./models/Room");
require("./models/Messager");
//const Rooms = mongoose.model("rooms");
//const Messager = mongoose.model("messagers");
// BANCOS DE DADOS CARREGADOS




// AQCHIVE ESTATIC
app.use(express.static('public'));

// FAVICON CONFIGURADO
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//VIEW ENGINE
app.set("view engine", 'ejs');

// Mongoose
/*
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/chat_casin").then(() =>{
    console.log("MongoDB Chat Casino CONECTADO..!");
}).catch((err) =>{
    console.log("Houve um erro ao se conectar ao mongodb"+ err);
})
*/

//BODY-PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ROUTAS QUE RENDERIZA A VIEW DO MERCADO EXPRESS
app.get("/", (req, res) =>{
    res.render("warning")
})

// ROUTAS QUE RENDERIZA A VIEW DE SELEÇÃO DAS SALAS
app.get("/sale", (req, res) =>{
    res.render("classrooms")
})

// ROUTAS QUE RENDERIZA A VIEW DA SALA DE SMS
app.get("/chat", (req, res) =>{
    res.render("chat")
})


// BANCO DE DADOS SIMULADO PARA SALAS
const users = []
// BANCO DE DADOS SIMULADO PARA SMS
const messages = []

// CONECTANDO O SOCKET.IO VIA HTTP
io.on('connection', socket =>{

    // Escutando o evento emitido do Client informando a sala e o nome do usuário
    socket.on("select_room", (data, callback) =>{
        

        // Inserir o usuário para dentro de uma sala
        socket.join(data.room);

        // Verificando se o usuário já está dentro da sala, caso esteja alteraremos apenas o socket_id
        const userInRoom = users.find(user => user.username === data.username && user.room === data.room);

        if(userInRoom){
            userInRoom.socket_id = socket.id;
        }else{
            // Armazenando os o nome da sala do usuário e o socket_id no banco
            users.push({
                room: data.room,
                username: data.username,
                socket_id: socket.id
            });
        }

        const messagesRoom = getMessagesRoom(data.room);
        callback(messagesRoom);
        
    });
    // Escutando o evento emitido do Client informando a sala e o nome do usuário //
    
    // Escutando o evento emitido do Cliet informando a sala o nome e a sua sms
    socket.on("message", data =>{
        const message = {
            room: data.room,
            username: data.username,
            text: data.message,
            createdAt: new Date(),
        }

        messages.push(message);

        // Enviar a sms para o usuário responsável pela sala
        io.to(data.room).emit("message", message);
    })
    // Escutando o evento emitido do Cliet informando a sala o nome e a sua sms

});
// CONECTANDO O SOCKET.IO VIA HTTP

// FUNÇÃO PARA TORNAR CONSISTENTES AS SMS NAS SALAS
function getMessagesRoom(room) {
    const messagesRoom = messages.filter(message => message.room === room);
    return messagesRoom;
}

// ROUTAS EXTERNAS EM USO
app.use("/",pagesRouter);

// Routa de requisição não encontrada.
app.get("*", (req, res) =>{
    res.status(404)
    res.render("404");
    return;
})

const PORT = 4000
server.listen(PORT, () =>{
    console.log(`MERCADO EXPRESS NO AR! ${PORT}`)
})