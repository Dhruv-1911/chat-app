const socket = io();
let name;
let input = document.querySelector("#textarea");
let newMessage = document.querySelector(".message__area");

do {
    name =prompt("please provide user name")
} while (!name);

input.addEventListener("keyup",(e)=>{
   // console.log("working../././")
   if(e.key === 'Enter') {
      sendMessage(e.target.value)
      console.log('e.target.value: ', e.target.value);
  }

})

function sendMessage(Message){
   let msg={
      user: name,
      Message:Message.trim()
   }

   //append
   appendMessage(msg,"outgoing")
   input.value=""
   scrollToBottom()

   //send to server
   socket.emit("message",msg)
}
 
function appendMessage(msg,type){
   let newDiv = document.createElement("div")
   let className = type
   newDiv.classList.add(className,"message")

    let new_Message =`
      <h5>${msg.user}</h5>
      <p>${msg.Message}</P>
    `

    newDiv.innerHTML = new_Message
    newMessage.appendChild(newDiv)

}

// Recieve messages 
socket.on('message', (msg) => {
   appendMessage(msg, 'incoming')
   scrollToBottom()
})

function scrollToBottom() {
   newMessage.scrollTop = newMessage.scrollHeight
}


