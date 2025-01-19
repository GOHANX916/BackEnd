const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize express and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize socket.io
const io = socketIo(server);

// Serve the chat front-end (if you have static files)
app.use(express.static('public'));

// Handle incoming WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    socket.broadcast.emit('receiveMessage', message); // Broadcast to other clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
