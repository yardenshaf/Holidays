import { Server } from 'socket.io';
import http from 'http';
import config from 'config';
import express from 'express';

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('NewLike', (payload) => {
        socket.broadcast.emit('NewLike', payload);
    });

    socket.on('RemoveLike', (payload) => {
        socket.broadcast.emit('RemoveLike', payload);
    });

    socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

httpServer.listen(config.get('port'), () => {
    console.log(`Socket.IO server running on port ${config.get('port')}`);
});

export function getIoInstance() {
    return io;
}

export default app;
