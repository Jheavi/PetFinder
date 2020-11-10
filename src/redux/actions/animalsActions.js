import actionTypes from '../../actions/action-types';
import store from '../../stores/principal-store';

export const requestAnimals = (type, breed, gender, age, status) => async (
	dispatch
) => {
	debugger;
	type = !type ? '' : type;
	breed = !breed ? '' : breed;
	gender = !gender ? '' : gender;
	age = !age ? '' : age;
	status = !status ? 'adoptable' : status;
	try {
		const response = await fetch(
			`https://api.petfinder.com/v2/animals?type=${type}&breed=${breed}&gender=${gender}&age=${age}&limit=100&status=${status}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${store.getToken()}`
				}
			}
		);
		const animals = await response.json();
		dispatch(loadAnimals(animals));
	} catch (error) {
		return null;
	}
};

function loadAnimals(animalObject) {
	return {
		type: actionTypes.REQUEST_ANIMALS,
		animals: animalObject.animals
	};
}

export const requestAnimal = (animalId) => async (dispatch) => {
	debugger;
	try {
		const response = await fetch(
			`https://api.petfinder.com/v2/animals/${animalId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${store.getToken()}`
				}
			}
		);
		const animal = await response.json();
		debugger;
		dispatch({
			type: actionTypes.REQUEST_ANIMAL,
			animal: animal.animal
		});
	} catch (error) {
		return null;
	}
};
