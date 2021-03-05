import store from './principal-store';
import dispatcher from '../dispatcher/dispatcher';
import actionTypes from '../actions/actionTypes';

describe('Store functions', () => {
	beforeEach(() => {
		store.setToken(null);
		store.setAnimal(null);
		store.setAnimals([]);
	});
	test('should be defined', () => {
		expect(store).toBeDefined();
	});

	describe('getToken', () => {
		test('should return _token', () => {
			//arrange
			store.setToken('123456');
			//act
			const response = store.getToken();
			//assert
			expect(response).toBe('123456');
		});
	});

	describe('getAnimal', () => {
		test('should return _animal', () => {
			//arrange
			store.setAnimal({ name: 'test' });
			//act
			const response = store.getAnimal();
			//assert
			expect(response).toEqual({ name: 'test' });
		});
	});

	describe('getAnimals', () => {
		test('should return _animals', () => {
			//arrange
			store.setAnimals([
				{ name: 'test', photos: ['1'] },
				{ name: 'test2', photos: ['1'] }
			]);
			//act
			const response = store.getAnimals();
			//assert
			expect(response).toEqual([
				{ name: 'test', photos: ['1'] },
				{ name: 'test2', photos: ['1'] }
			]);
		});
	});

	describe('addEventListener', () => {
		test('should return test changed to "Event listened"', () => {
			//arrange
			let test = '';
			function callback() {
				test = 'Event listened';
			}
			//act
			store.addEventListener(callback);
			store.emitChange();
			//assert
			expect(test).toBe('Event listened');
		});

		describe('removeEventListener', () => {
			test('should return test without changes', () => {
				//arrange
				let test = '';
				function callback() {
					test = 'Event listened';
				}
				//act
				store.addEventListener(callback);
				store.removeEventListener(callback);
				store.emitChange();
				//assert
				expect(test).toBe('');
			});
		});

		describe('getUrlFilter', () => {
			test('should return _urlFilter', () => {
				//arrange
				store.setUrlFilter({});
				//act
				const response = store.getUrlFilter();
				//assert
				expect(response).toEqual({});
			});
		});

		describe('resetFilters', () => {
			test('should reset every property of _urlFilter to an empty array', () => {
				//arrange
				store.setUrlFilter({ gender: ['1', '2'], age: ['3', '4'] });
				//act
				store.resetFilters();
				//assert
				expect(store.getUrlFilter()).toEqual({ gender: [], age: [] });
			});
		});

		describe('resetFilterOnClick', () => {
			let inputList;
			beforeEach(() => {
				for (let index = 0; index < 2; index++) {
					let inputElement = document.createElement('input');
					inputElement.setAttribute('class', 'inputBox');
					inputElement.setAttribute('checked', 'true');
					document.body.appendChild(inputElement);
				}
				inputList = document.getElementsByClassName('inputBox');
			});

			test('to the first input element with class inputBox should put the property checked to false', () => {
				//arrange
				//act
				store.resetFilterOnClick('inputBox');
				//assert
				expect(inputList[0].checked).toBe(false);
			});

			test('to the second input element with class inputBox should put the property checked to false', () => {
				//arrange
				//act
				store.resetFilterOnClick('inputBox');
				//assert
				expect(inputList[1].checked).toBe(false);
			});
		});

		describe('dispatcher.register: REQUEST_TOKEN', () => {
			test('should change _token from store and put it in testToken', () => {
				//arrange
				let testToken = '';
				function callback() {
					testToken = store.getToken();
				}
				//act
				store.addEventListener(callback);
				debugger;
				dispatcher.dispatch({
					type: actionTypes.REQUEST_TOKEN,
					payload: '123456'
				});
				//assert
				expect(testToken).toBe('123456');
			});
		});

		describe('dispatcher.register: REQUEST_ANIMAL', () => {
			test('should change _animal from store and put it in testAnimal', () => {
				//arrange
				let testAnimal = {};
				function callback() {
					testAnimal = store.getAnimal();
				}
				//act
				store.addEventListener(callback);
				dispatcher.dispatch({
					type: actionTypes.REQUEST_ANIMAL,
					payload: { name: 'cat' }
				});
				//assert
				expect(testAnimal).toEqual({ name: 'cat' });
			});

			describe('dispatcher.register: REQUEST_ANIMALS', () => {
				test('should change _animals from store and put it in testAnimals', () => {
					//arrange
					let testAnimals = [];
					function callback() {
						testAnimals = store.getAnimals();
					}
					//act
					store.addEventListener(callback);
					dispatcher.dispatch({
						type: actionTypes.REQUEST_ANIMALS,
						payload: [{ name: 'cat', photos: ['1'] }]
					});
					//assert
					expect(testAnimals).toEqual([{ name: 'cat', photos: ['1'] }]);
				});
			});
		});
	});
});
