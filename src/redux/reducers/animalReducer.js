import actionTypes from '../../actions/action-types';

export default function animalReducer(state = {}, action) {
	switch (action.type) {
		case actionTypes.REQUEST_ANIMAL:
			return { ...state, animal: action.animal };

		default:
			return state;
	}
}
