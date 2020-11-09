import authStore from './auth-store';
import dispatcher from '../dispatcher/dispatcher';
import actionTypes from '../actions/action-types';

describe('authStore', () => {
	beforeEach(() => {
		authStore.setUser(null);
	});

	afterEach(() => {
		authStore.setUser(null);
	});

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

	describe('dispatcher.register actions', () => {
		test('should change _user from store', () => {
			const fakeuser = {};
			dispatcher.dispatch({
				type: actionTypes.AUTH_LOGIN,
				payload: fakeuser
			});
			expect(authStore.getUser()).toEqual(fakeuser);
		});

		test('should change _user from store to null', () => {
			dispatcher.dispatch({
				type: actionTypes.AUTH_SIGNOUT
			});
			expect(authStore.getUser()).toBe(null);
		});
	});
});
