import actionTypes from '../../actions/action-types';

export default function animalReducer(state = null, action) {
	switch (action.type) {
		case actionTypes.REQUEST_ANIMAL:
			return action.animal;

		default:
			return state;
	}
}
