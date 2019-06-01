export const socketHandlers = (socket) => {
	const addVote = (data) => {
		socket.broadcast.emit('vote added', {pollId: data.pollId});
	};

	socket.emit('connect success', { connection: 'success' });
	socket.on('add vote', addVote);
};