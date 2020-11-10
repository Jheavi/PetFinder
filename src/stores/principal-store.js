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
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJEMFZNYzJ3a0tVTEVkNzNtQkpoSWhWazdqaVUxcXgwVWpXbnFuWWZQTmRrdWMxT0VRUiIsImp0aSI6IjI4ZDk5N2YxNDQxMjlkZTg2NDM0N2U1NjQ1ODkzNDBmNTE2ZmFjMzJlNTE3ZjY3ZWM1ZDI4NDg4Y2NhY2QwM2M2ZmFhMjYwMDc5Yzk2OTgzIiwiaWF0IjoxNjA1MDE1MzYyLCJuYmYiOjE2MDUwMTUzNjIsImV4cCI6MTYwNTAxODk2Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.h75plznPp0W_sVHufgUaEdnDcd1b5Je182W1BCpLsWNLQRS4u07rttoluTf7AmW5FEeA-ywTfv49WE7d_ZXxH3CjQqj4kH2rvlg-9P2Cn4ZBPusq4CERKhc9cDrnTKm_z2rUF5I8Xkec5DZrU0sKYNu_XpZZ43Ui_wcvWMgnkM8U0ca6tTbUDhjncuV_9iCPDcX4KOVupob0W0aaVzjwzyuikT-ZUTXLVtHVwlFb2tsYL0ghTnjq1j2a9Qkodmk7HnWGy0dsi0nq1C_Hlx535qov42hj7WchoUYMfuKhxTYOaSwNVnZGrOQuWesWaBrN8d2Xb4bS_w4P9al9mcRXtQ';

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
