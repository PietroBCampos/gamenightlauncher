const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('Client connected');
    
    ws.on('message', function incoming(data) {
        console.log('Received message from client:', data.toString());
        
        // Broadcast the message to all clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                console.log('Sending message to client:', data.toString());
                client.send(data.toString());
            }
        });
    });

    // Optional: Handle client close event (commented out to prevent automatic closure)
    // ws.on('close', function close() {
    //     console.log('Client disconnected');
    // });
});
server.listen(3000, '0.0.0.0', function() {
    console.log('Server is listening on port 3000');
});

