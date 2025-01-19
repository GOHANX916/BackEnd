const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express app
const app = express();
const server = http.createServer(app);

// Set up WebSocket server using Socket.IO
const io = socketIo(server);

// Handle WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Listen for messages from the client
  socket.on('sendMessage', (message) => {
    console.log('Message received: ', message);
    // Emit the message to all connected clients
    io.emit('receiveMessage', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// HTTP route for root URL
app.get('/', (req, res) => {
  res.send('WebSocket server is running!');
});

// Start the server on a specific port
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
