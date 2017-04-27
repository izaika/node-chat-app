const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
	it('Should reject non-string values', () => {
		expect(isRealString(5)).toBe(false);
	});

	it('Should reject string with only spaces', () => {
		expect(isRealString('     ')).toBe(false);
	});

	it('Should allow string with non-space characters', () => {
		expect(isRealString('Lorem ipsum')).toBe(true);
	});
});
