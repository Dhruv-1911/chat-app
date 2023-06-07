const socket = io();
let name;
let input = document.querySelector("#textarea");
let newMessage = document.querySelector(".message__area");
let sendLocation = document.querySelector("#send-location");

do {
   name = prompt("please provide user name")
} while (!name);

input.addEventListener("keyup", (e) => {
   // console.log("working../././")
   if (e.key === 'Enter') {
      sendMessage(e.target.value)
      console.log('e.target.value: ', e.target.value);
   }

})

function sendMessage(Message) {
   let msg = {
      user: name,
      Message: Message.trim()
   }

   //append
   appendMessage(msg, "outgoing")
   input.value = ""
   scrollToBottom()

   //send to server
   socket.emit("message", msg)
}

function appendMessage(msg, type,location) {
   let newDiv = document.createElement("div")
   let className = type
   newDiv.classList.add(className, "message")

   let new_Message = `
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

sendLocation.addEventListener("click", (e) => {
   if (!navigator.geolocation) {
      return alert("Your browser not support to the geolocation")
   }
   navigator.geolocation.getCurrentPosition((position) => {

      let lat = position.coords.latitude
      let lag = position.coords.longitude

      let location = ` https://www.google.com/maps?q=${lat},${lag}`
      socket.emit("creategeolocation", location)

      appendgeolocation(location);
      scrollToBottom()
   }, () => {
      alert("unable to fetch data from geolocation")
   })
})

function appendgeolocation(location){
   let newDiv = document.createElement("div")
   let a = document.createElement("a")
   a.classList.add("location")
    
   a.setAttribute("target","_blank")
   a.setAttribute("href",location)

   // a.innerHTML= `<i class="ph ph-map-pin-line"></i>`
   a.innerText="Click me"
   newMessage.appendChild(a)
}
// socket.on('newmessage', (location) => {
//    appendgeolocation(location)
//    scrollToBottom()
// })