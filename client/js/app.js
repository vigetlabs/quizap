const socket = io()
const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')

form.addEventListener('submit', function(e) {
  e.preventDefault()
  socket.emit('chat message', input.value)
  input.value = ''
})

socket.on('user connected', function(){
  const li = document.createElement('li')
  console.log('user connected')
  li.innerText = 'user connected'
  messages.appendChild(li)
})

socket.on('chat message', function(message){
  const li = document.createElement('li')
  li.innerText = message
  messages.appendChild(li)
})
