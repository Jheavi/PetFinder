import authStore from './auth-store';

describe('authStore', () => {
	describe('getUser', () => {
		test('should return user', () => {
			authStore.setUser('abc');
			expect(authStore.getUser()).toBe('abc');
		});
	});

	describe('addChangeListener', () => {
		test('should return test changed to "Event listened"', () => {
			//arrange
			let test = '';
			function callback() {
				test = 'Event listened';
			}
			//act
			authStore.addChangeListener(callback);
			authStore.emitChange();
			//assert
			expect(test).toBe('Event listened');
		});
	});

	describe('removeChangeListener', () => {
		test('should return test without changes', () => {
			//arrange
			let test = '';
			function callback() {
				test = 'Event listened';
			}
			//act
			authStore.addChangeListener(callback);
			authStore.removeChangeListener(callback);
			authStore.emitChange();
			//assert
			expect(test).toBe('');
		});
	});
});
