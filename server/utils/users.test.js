const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [
			{
				id: '1',
				name: 'Mike',
				room: 'Node Course'
			},
			{
				id: '2',
				name: 'Jen',
				room: 'React Course'
			},
			{
				id: '3',
				name: 'Igor',
				room: 'Node Course'
			},
		];
	});

	it('Should add new user', () => {
		var users = new Users();
		var user = {
			id: 1,
			name: 'Igor',
			room: 'Sumy'
		};
		users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('Should remove a user', () => {
		var firstUser = users.users[0];
		var removedUser = users.removeUser(firstUser.id);
		expect(removedUser).toEqual(firstUser);
		expect(users.users.length).toBe(2);
	});

	it('Should not remove a user', () => {
		var removedUser = users.removeUser('asdfasfs');
		expect(removedUser).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('Should find user', () => {
		expect(users.getUser('1')).toEqual(users.users[0]);
	});

	it('Should not find user', () => {
		expect(users.getUser('asfdasf')).toNotExist();
	});

	it('Should return names for node course', () => {
		var userList = users.getUserList('Node Course');
		expect(userList).toEqual(['Mike', 'Igor']);
	});

	it('Should return names for react course', () => {
		var userList = users.getUserList('React Course');
		expect(userList).toEqual(['Jen']);
	});
});