import { Server } from 'socket.io';
import errors from '../models/core/errors.js';

export default function webSocket(httpServer) {
	const io = new Server(httpServer, {
		cors: {
			origin: '*',
		},
	});

	io.of('/').on('connection', (socket) => {
		if (!socket.handshake.query.uuid) {
			throw new errors.InvalidInputError('uuid is must not be null');
		}
		socket.join(socket.handshake.query.uuid);
		socket.on('send', (data) => {
			socket.to(socket.handshake.query.uuid).emit('onmessage',data);
		});
		socket.on('disconnect', () => {
			socket.leave(socket.handshake.query.uuid);
		});
	});
}
