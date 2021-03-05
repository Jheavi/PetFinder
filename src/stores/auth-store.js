import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE = 'CHANGE';
let _user;

class AuthStore extends EventEmitter {
	getUser() {
		return _user;
	}

	setUser(user) {
		_user = user;
	}

	addChangeListener(callback) {
		this.on(CHANGE, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE, callback);
	}

	emitChange() {
		this.emit(CHANGE);
	}
}

const authStore = new AuthStore();

dispatcher.register((action) => {
	switch (action.type) {
		case actionTypes.AUTH_LOGIN:
			_user = action.payload;
			authStore.emitChange();
			break;
		case actionTypes.AUTH_SIGNOUT:
			_user = null;
			authStore.emitChange();
			break;
		case actionTypes.AUTH_LOGIN_ERROR:
		case actionTypes.AUTH_SIGNOUT_ERROR:
		default:
			break;
	}
});

export default authStore;
