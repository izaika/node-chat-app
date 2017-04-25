var socket = io();

var messageForm = $('#message_form');
var messagesList = $('#messages');

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	console.log('New message', message);
	messagesList.append($('<li>').text(`${message.from}: ${message.text}`));

});

messageForm.on('submit', function (e) {
	e.preventDefault();


	socket.emit('createMessage', {
		from: 'User',
		text: $('input', messageForm).val()
	}, function () {

	});
});