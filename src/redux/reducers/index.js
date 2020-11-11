import { combineReducers } from 'redux';
import animalsReducer from './animalsReducer';
import animalReducer from './animalReducer';

const rootReducer = combineReducers({
	animalsReducer,
	animalReducer
});

export default rootReducer;
