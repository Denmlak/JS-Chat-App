const express= require('express');
const app= express();
const server= require('http').Server(app);
const io= require('socket.io')(server);
const port= process.env.PORT || 3000;
const users= {};

app.use(express.static('public'));
app.get('/public', (req,res) =>{
	res.render('index'); 
});

io.on('connection', socket=>{
	socket.on('new-user', name=>{
		for(const key in users){
			if (name === users[key]) {
				let nameTaken= name;
				return socket.emit('name-taken', nameTaken);
			}				 
		}
		socket.emit('you-joined', name);
		users[socket.id]= name;
		socket.broadcast.emit('user-joined', name);
	})
	socket.on('message-input', message=>{
		socket.broadcast.emit('chat-message', {message:message, name: users[socket.id]});
	});
	socket.on('disconnect', ()=>{
		socket.broadcast.emit('user-disconnected', users[socket.id]);
		delete users[socket.id];
	})
});
server.listen(port, () => {
	console.log(`server is running on port ${port}`);
});


