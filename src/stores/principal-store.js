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
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJEMFZNYzJ3a0tVTEVkNzNtQkpoSWhWazdqaVUxcXgwVWpXbnFuWWZQTmRrdWMxT0VRUiIsImp0aSI6ImQyZjllNzQyYzJmOTZhOTYwODgyNWEwMjM1YWZlMWViZmY3MGM1ZGIwZjdkOWQ5NDE0OGEyNmIzYWVmNTc2MDk5NjkxNWNlYjFhNDYwODZiIiwiaWF0IjoxNjA1MDk5MTE0LCJuYmYiOjE2MDUwOTkxMTQsImV4cCI6MTYwNTEwMjcxNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.usu8QYwAVInZaGBCtFN-D7iP5pQUeztkKsxkyVCljld_iUYP-5SIUuu_rBzcMRDROSryke8CIJWgJRBNenQTDT28a9NcdCXWgslERuELl1U3DTztmhuiOgIFu1HoQHeglS9lqmfCcg0iZT_0WdheXT_FmNvoWeiy3BJv_eipEHTdML1VAbRHhdDx-x9d7oDSv0UV9Aw9-rJ-bvVgAZo9Cbj9o-mRThvY3rTCKU7HshBGy9DJnuRc01Hpr_7fGcL-YS51jJ9WIhws6K55M6lRK9Ga1dm9ylhu9I9HdSF-TDl0O3K71d9QAAQ1F3KtgSVC6V01Tb9gq1ll2kE7V5lfNw';

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
