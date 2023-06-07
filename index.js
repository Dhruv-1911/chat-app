const { log } = require('console')
const express = require('express')
const app = express()
const http = require('http').createServer(app)

http.listen(3000, () => {
    console.log(`Listening on port 3000`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


const io = require('socket.io')(http)

io.on("connection", (socket) => {
    console.log('socket connected........'); 
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })

   socket.on("creategeolocation",(location)=>{
        socket.emit("newmessage",location)
    })
  });