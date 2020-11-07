import React, { useEffect, useState } from 'react';
import { requestToken, requestAnimals } from '../../actions/actions';
import store from './../../stores/principal-store';
import Filters from './Filters';
import List from './List';

function MainList() {
	const [token, setToken] = useState(store.getToken());
	const [animals, setAnimals] = useState(store.getAnimals());
	const params = new URLSearchParams(window.location.search.substring(1));
	const type = params.get('type');
	const breed = params.get('breed');
	const gender = params.get('gender');
	const age = params.get('age');

	function handleChange() {
		setToken(store.getToken());
		setAnimals(store.getAnimals());
	}
	useEffect(() => {
		store.addEventListener(handleChange);
		if (!token) {
			requestToken();
		} else if (!animals) {
			requestAnimals(type, breed, gender, age);
		}
		return () => store.removeEventListener(handleChange);
	}, [token, animals, type, breed, gender, age]);

	return (
		<main className="main-container-list">
			<Filters type={type} animals={animals} />
			<List animals={animals} />
		</main>
	);
}

export default MainList;
