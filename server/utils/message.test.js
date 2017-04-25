const expect = require('expect');

var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('Should generate correct message object', () => {
		var from = 'Test user';
		var text = 'Test text';
		var message = generateMessage(from, text);

		expect(message.from).toBe(from);
		expect(message.text).toBe(text);
		expect(message.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('Should generate correct location object', () => {
		var from = 'Test user';
		var latitude = 1;
		var longitude = 2;

		var message = generateLocationMessage(from, latitude, longitude);

		expect(message.from).toBe(from);
		expect(message.url).toBe(`https://google.com/maps?q=${latitude},${longitude}`);
		expect(message.createdAt).toBeA('number');
	});
});