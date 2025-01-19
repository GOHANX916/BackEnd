const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// API key for authentication
const VALID_API_KEY = 'rnd_kipMK9Pg0XiWQy25SgACKK5tO4k8';

// WebSocket connection
io.on('connection', (socket) => {
  // Check the API key passed in the URL query
  const apiKey = socket.handshake.query.apiKey;

  if (apiKey !== VALID_API_KEY) {
    console.log('Invalid API Key');
    socket.disconnect(true); // Disconnect if the API key is invalid
    return;
  }

  console.log('User connected');

  // Handle the 'sendMessage' event
  socket.on('sendMessage', (message) => {
    console.log('Received message:', message);
    io.emit('receiveMessage', message); // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Serve the static files (if any) from the public folder
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
