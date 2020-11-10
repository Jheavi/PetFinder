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
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJEMFZNYzJ3a0tVTEVkNzNtQkpoSWhWazdqaVUxcXgwVWpXbnFuWWZQTmRrdWMxT0VRUiIsImp0aSI6IjUyY2M2YWNiNGRmNzE1YWZjNjhjNDdlYzhkYzBlNDU5OGVmMDEwNjBiYjVhYzJhMzdiY2RmZTdjYWFmZTA0ZmMyZWYwZDI0MWNlNjBiNTcyIiwiaWF0IjoxNjA0OTk1MTM5LCJuYmYiOjE2MDQ5OTUxMzksImV4cCI6MTYwNDk5ODczOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.lXZ00o4Zz08lUYG9Erac3P2ftWcQfTbvcMj64sYxcpp-4TvSHZUuNO_4eVKHmLszVvF7hOlkNJ9tmOp0Lz10aBesHfYW429ZVoIUVQSldK6Bgg3JSyv8OwD8hmMtnumrvW2CuL5Iew_C2YG_ZidNMS4jWaTwFAN4D4V5eynDDhbP0mzovExpUqqJDHCtmwS3mGNJYMNjtRRx4nOAMwxwAOZ_MxosHwyvr5gxtoVXYgubstm08_-WpSBDM6xaa6Eu4D1v7lAGpM2BriCPn_3eTv7METWbC9UsF8ivbhzqoFTERzOcU3DxQCeWkC8qiV8AAglPGkM0fWco1uUiiZGTNw';

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
