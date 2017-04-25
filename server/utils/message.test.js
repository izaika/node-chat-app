const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('Should generate the correct message object', () => {
		var from = 'Test user';
		var text = 'Test text';
		var message = generateMessage(from, text);

		expect(message.from).toBe(from);
		expect(message.text).toBe(text);

		expect(message.createdAt).toBeA('number');
	});
});