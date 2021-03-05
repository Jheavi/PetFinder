import dispatcher from '../dispatcher/dispatcher';
import actionTypes from '../actions/actionTypes';
import store from '../stores/principal-store';

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

async function requestToken() {
	try {
		const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`)
			},
			body: 'grant_type=client_credentials'
		});

		const data = await response.json();
		
		dispatcher.dispatch({
			type: actionTypes.REQUEST_TOKEN,
			payload: data.access_token
		});
	} catch (error) {
		return null;
	}
}

async function requestAnimal(animalId) {
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

		dispatcher.dispatch({
			type: actionTypes.REQUEST_ANIMAL,
			payload: animal.animal
		});
	} catch (error) {
		return null;
	}
}

async function requestAnimals(type, breed, gender, age, status) {
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

		dispatcher.dispatch({
			type: actionTypes.REQUEST_ANIMALS,
			payload: animals.animals
		});
	} catch (error) {
		return null;
	}
}

export { requestToken, requestAnimal, requestAnimals };
