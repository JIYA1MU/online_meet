const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5000;

app.use(express.static('public')); // Serve static files from 'public' folder if needed


io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle join request
  socket.on('requestJoin', (data) => {
    console.log(`Join request received from: ${data.id}`);
    // Broadcast the request to all admins or specific rooms
    socket.broadcast.emit('requestJoin', { id: data.id });
  });

  // Handle join approval
  socket.on('approveJoin', (data) => {
    console.log(`Join approved for: ${data.id}`);
    // Notify the participant that their request has been approved
    io.to(data.id).emit('approval');
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
