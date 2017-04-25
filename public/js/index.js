var socket = io();

var messageForm = $('#message_form');
var messagesList = $('#messages');
var locationButton = $('#send_location');

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	console.log('New message', message);
	var formatedTime = moment(message.createdAt).format('HH:mm');
	messagesList.append($('<li>').text(`${message.from} ${formatedTime}: ${message.text}`));
});

socket.on('newLocationMessage', function (message) {
	console.log('New location message', message);
	var li = $('<li>');
	var formatedTime = moment(message.createdAt).format('HH:mm');
	var a = $('<a>My current location</a>').attr({
		href: message.url,
		target: '_blank'
	});

	li.text(`${message.from} ${formatedTime}: `);
	li.append(a);

	messagesList.append(li);
});

messageForm.on('submit', function (e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('input', messageForm).val()
	}, function () {
		messageForm.trigger('reset');
	});
});

locationButton.on('click', function (e) {
	if (!navigator.geolocation) return alert('Geolocation is not supported by your browser.');

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
});