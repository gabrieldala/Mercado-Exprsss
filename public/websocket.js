const socket = io();


    // PEGANDO A SALA E O NOME NA URL
        const urlSearch = new URLSearchParams(window.location.search);
        const username = urlSearch.get("username");
        const room = urlSearch.get("select_room");
    // PEGANDO A SALA E O NOME NA URL

    // PEGANDO O NOME DO USER PARA IMPRIMIR NA TELA
    const usernameDiv = window.document.getElementById("username");
    usernameDiv.innerHTML = `<br><div class="card"> <div class="card-header" style="color:black;">Olá <span style="color:red;">${username}</span> - Você está na sala de conversa de <span style="color:red;">${room}</span> </div> </div>`

    // Emitindo evento para o server informando a sala e o nome do usuário
    socket.emit("select_room", {
        username,
        room,
    },
    (messages) =>{
        messages.forEach(message => createMessage(message))
    });
    // Emitindo evento para o server informando a sala e o nome do usuário //

    // Pegando as sms escritas pelo usuário para enviar ao servidor
    document
    .getElementById("message_input")
    .addEventListener("keypress", (event) =>{
       if(event.key === 'Enter') {
        const message = event.target.value;
        event.target.value = "";
        
        const data ={
            room,
            message,
            username
        }
        // Emitindo ao server sobre a sms digitada pelo user e a sua respetiva sala
        socket.emit("message", data)
       }
    });
    // Pegando as sms escritas pelo usuário para enviar ao servidor

    // Recebendo de volta a sms em sua tela
    socket.on("message", data =>{
        createMessage(data)
    });

    function createMessage(data) {

        const messageDiv = window.document.getElementById("messages");
        messageDiv.innerHTML +=`
        <div class="new_message">
                    <label class="form_label">
                        <strong style="color:#4b9847; font-size: 20px;"> ${data.username} </strong> <br> <span style="font-size: 16px;"> ${data.text} <br> <span style="font-size: 12px;">${dayjs(
                            data.createdAt
                            ).format("HH:mm DD/MM/YY")}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                  </span></span>
                  
                </div>
        `;
    }
    // Recebendo de volta a sms em sua tela //

    // Redirecionando com Logout
    document.getElementById("logout").addEventListener("click", (event) =>{
        window.location.href = "index.html";
    });