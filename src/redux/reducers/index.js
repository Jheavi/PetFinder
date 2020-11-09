import { combineReducers } from 'redux';
import animals from './animalsReducer';
import animal from './animalReducer';

const rootReducer = combineReducers({
	animals,
	animal
});

export default rootReducer;
