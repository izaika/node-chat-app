var socket = io();

function scrollToBottom() {
	// Selectors
	var messages	= $('#messages');
	var newMessage	= messages.children('li:last-child');

	// Heights
	var clientHeight		= messages.prop('clientHeight');
	var scrollTop			= messages.prop('scrollTop');
	var scrollHeight		= messages.prop('scrollHeight');
	var newMessageHeight	= newMessage.innerHeight();
	var lastMessageHeight	= newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

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
	var formatedTime = moment(message.createdAt).format('HH:mm');
	var template = $('#message_template').html();
	var html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		createdAt: formatedTime
	});

	$('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
	var formatedTime = moment(message.createdAt).format('HH:mm');
	var template = $('#location_message_template').html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formatedTime
	});

	$('#messages').append(html);
	scrollToBottom();
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