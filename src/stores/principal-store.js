import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import actionTypes from '../actions/action-types';

const CHANGE = 'CHANGE';
let _animal;
let _token;
let _burgerClick = false;

class Store extends EventEmitter {
    getToken() {
        return _token;
    }

    getAnimal() {
        return _animal;
    }

    getBurgerClick() {
        return _burgerClick;
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
        case actionTypes.BURGER_CLIC:
            _burgerClick = !_burgerClick;
            store.emitChange();
            break;

        default:
            break;
    }
});

export default store;
