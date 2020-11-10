import { combineReducers } from 'redux';
import animalsR from './animalsReducer';
import animal from './animalReducer';

const rootReducer = combineReducers({
	animalsR,
	animal
});

export default rootReducer;
