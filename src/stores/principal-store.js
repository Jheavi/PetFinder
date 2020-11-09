import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import actionTypes from '../actions/action-types';

const CHANGE = 'CHANGE';
let _urlFilter = {
	type: [],
	age: [],
	gender: []
};
let _animal;
let _token =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJEMFZNYzJ3a0tVTEVkNzNtQkpoSWhWazdqaVUxcXgwVWpXbnFuWWZQTmRrdWMxT0VRUiIsImp0aSI6ImRkZTcyYTQxOWQ1YjI0NWE4M2FjNGM3MTg0NzIzZjY4ZmM1ZjUwNzNlMjkyNjBjMmVmMjc1MzRmZWY4MzBhZDNjYTI3MmI5Y2ZlYWE5NjkxIiwiaWF0IjoxNjA0OTYwMDI4LCJuYmYiOjE2MDQ5NjAwMjgsImV4cCI6MTYwNDk2MzYyNywic3ViIjoiIiwic2NvcGVzIjpbXX0.rRX2CRavUZuNCNU861uAij5nefG10qzaJo_jMARGuUQ4VMmwqlQPapkVwmJ8wS7q68-UWVHT09hpvhtV6dzWlP5fd6gYpO3_nI0TCAWlBcqYJC1tLB2Npi0-gCGk_dqB0gPFMp27nEUPCTD2p3M4Tq0NTp2Jx9vPyyiBt654ohhmzywxnlgzTpQVgl-4HK8O4sXAqjBK0-DTTMv8YMnNSfV1J_NAf-UvMfNDK9xipJQQ4pkkMfjUIf9O86HMVHVaBYHZTM85VJma9Z7BXgEB6vZ6JIhXYeYVVcTxXSnnA5l-behFBAU54X8fJMnkLieScFwRfzGbjR97e6jVC-m5qQ';

let _animals = [];

class Store extends EventEmitter {
	setToken(token) {
		_token = token;
	}

	getToken() {
		return _token;
	}

	setAnimal(animal) {
		_animal = animal;
	}

	getAnimal() {
		return _animal;
	}

	setAnimals(animals) {
		_animals = animals;
	}

	getAnimals() {
		return _animals
			?.filter((element) => {
				return element.photos.length > 0;
			})
			.slice(0, 20);
	}

	addEventListener(callback) {
		this.on(CHANGE, callback);
	}

	removeEventListener(callback) {
		this.removeListener(CHANGE, callback);
	}

	emitChange() {
		this.emit(CHANGE);
	}
	setUrlFilter(urlFilter) {
		_urlFilter = urlFilter;
	}

	getUrlFilter() {
		return _urlFilter;
	}

	resetFilters() {
		for (let property in _urlFilter) {
			_urlFilter[property] = [];
		}
	}

	resetFilterOnClick(className) {
		const filterArray = document.getElementsByClassName(className);
		for (let index = 0; index < filterArray.length; index++) {
			filterArray[index].checked = false;
		}

		this.resetFilters();
	}
}

const store = new Store();

dispatcher.register((action) => {
	switch (action.type) {
		case actionTypes.REQUEST_TOKEN:
			_token = action.payload;
			store.emitChange();
			break;
		case actionTypes.REQUEST_ANIMAL:
			_animal = action.payload;
			store.emitChange();
			break;
		case actionTypes.REQUEST_ANIMALS:
			_animals = action.payload;
			store.emitChange();
			break;

		default:
			break;
	}
});

export default store;
export { Store };
