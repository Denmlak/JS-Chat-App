const socket= io();
const sendButton=document.getElementById('send-button');
const input=document.getElementById('message-input');
const chatArea=document.getElementById('chat-area');
let onlineUsers=document.getElementById('users-field');
let nameIsTaken=false;

socket.on('chat-message', data=>{
	appendUserMessage(`${data.name} : ${data.message}`);
	chatArea.scrollTop = chatArea.scrollHeight;
});

socket.on('user-joined', name=>{
	appendMessage(`System : ${name} joined chat`);
	chatArea.scrollTop = chatArea.scrollHeight;
	appendOnlineUser(name);	
});

socket.on('users-online', users=>{
	appendOnlineUser(users);
});

socket.on('user-disconnected', name=>{
	if (name === null) {
			return
		}
	appendMessage(`System : ${name} left chat`);
	chatArea.scrollTop = chatArea.scrollHeight;
	removeUser(name);
});

socket.on('name-taken', nameTaken =>{
	while(nameTaken === name || name === "" ){
		nameIsTaken=true;
		name=prompt('This name has been taken, please enter another:');
	}	
	socket.emit('new-user', name);
});

socket.on('you-joined', name =>{
	appendMessage(`System : You (${name}) joined chat`);
});

sendButton.addEventListener('click', e => {
	e.preventDefault();
	const message=input.value;
	if (message === '') {
		return
	}
	appenSelfMessage(`You (${name}) : ${message}`);
	socket.emit('message-input', message);
	chatArea.scrollTop = chatArea.scrollHeight;
	input.value='';
});

const appendOnlineUser= users =>{
	onlineUsers.innerHTML='';
	for(const key in users){
		let user= users[key];
		let messageElement= document.createElement('div');
		messageElement.setAttribute("id", user);
		messageElement.style.cssText = "color: #4d5f66";
		messageElement.innerText = user;
		onlineUsers.append(messageElement);	
	}
};

const removeUser= name=>{
	const removeName= document.getElementById(name);
	removeName.remove();
};

const appendMessage= message =>{
	const messageElement= document.createElement('div');
	messageElement.style.cssText = "color: #4d5f66";
	messageElement.innerText= message;
	chatArea.append(messageElement);
};

const appenSelfMessage= message =>{
	const messageElement= document.createElement('div');
	messageElement.style.cssText = "color: #36a8bf;";
	messageElement.innerText= message;
	chatArea.append(messageElement);	
};

const appendUserMessage= message =>{
	const messageElement= document.createElement('div');
	messageElement.style.cssText = "color: #2b8a22";
	messageElement.innerText=message;
	chatArea.append(messageElement);	
};

let name="";
while(name == null || name == "" || name.length > 8){
	
		name= prompt('Enter your name (max 8 characters):');	
	  };
socket.emit('new-user', name);













	





	  


	

		




	

