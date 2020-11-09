import actionTypes from '../../actions/action-types';

export default function animalsReducer(state = null, action) {
	switch (action.type) {
		case actionTypes.REQUEST_ANIMALS:
			return {
				...state,
				animals: action.animals
					.filter((animal) => {
						return animal.photos.length > 0;
					})
					.slice(0, 20)
			};

		default:
			return state;
	}
}
