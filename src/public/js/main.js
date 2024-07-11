console.log("conected")

const socket = io();

let user;

const chatBox = document.getElementById("chatBox");



//SweetAlert

Swal.fire({
    title: "Enter your name",
    input: "text",
    inputPlaceholder: "Your Name",
    inputValidator: (value) => { return !value && "please enter your name to continue" },
    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonText: "Submit",
    showLoaderOnConfirm: true,
}).then((result) => {
    if (result.isConfirmed) {
        user = result.value;
        // socket.emit("joinRoom", "general");
        // socket.emit("newUser", user);
    }
});

chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: user, message: chatBox.value })
            chatBox.value = "";
        }
    }
})

socket.on("messageLogs", (data) => {
    const messageLogs = document.getElementById("messageLogs");

    let messages = "";

    data.forEach(message => {
        messages += `
            <div class="message">
            
            <div class="text"><span class="user">${message.user} : </span> ${message.message}</div>
            </div>
       `
    })
    messageLogs.innerHTML = messages;
})


