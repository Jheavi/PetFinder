import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import ScrollRandomCats from './ScrollRandomCats';
import * as action from './../../actions/actions';
import store from './../../stores/principal-store';

jest.mock('./../../actions/actions');

describe('ScrollRandomCats', () => {
	let container;

	const animalsMock = [
		{
			id: 99,
			photos: [{ medium: 'ghfhgfh' }],
			name: 'gjgj'
		}
	];

	const fakeToken = '1234';

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
		act(() => {
			store.setToken();
			store.setAnimals([]);
			render(
				<BrowserRouter>
					<ScrollRandomCats />
				</BrowserRouter>,
				container
			);
		});
	});

	afterEach(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

	test('should render', () => {
		expect(container.querySelector('p').textContent).toBe(
			'Cats available for adoption'
		);
	});

	test('should request token', () => {
		expect(action.requestToken).toHaveBeenCalled();
	});

	test('should requestAnimals if token but not animals', async () => {
		act(() => {
			store.setToken(fakeToken);
			store.emitChange();
		});

		expect(action.requestAnimals).toHaveBeenCalled();
	});

	test('should call requestAnimal when click', () => {
		act(() => {
			store.setToken(fakeToken);
			store.setAnimals(animalsMock);
			store.emitChange();
		});
		let button = document.getElementById('cat-card-btn');
		button.dispatchEvent(
			new MouseEvent('click', { bubbles: true, cancelable: true })
		);
		expect(action.requestAnimal).toHaveBeenCalledTimes(1);
	});
});
