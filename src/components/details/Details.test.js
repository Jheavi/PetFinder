import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Details from './Details';
import authStore from '../../stores/auth-store';

describe('details', () => {
	let container;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

	test('should render details', () => {
		act(() => {
			render(
				<BrowserRouter>
					<Details
						animal={{
							name: 'ozzy',
							description: 'test',
							breeds: { primary: '' },
							tags: ['1', '2']
						}}
					/>
				</BrowserRouter>,
				container
			);
		});
		expect(container.querySelector('#donating').textContent).toBe('Donate!');
		expect(container.querySelector('#animal__name').textContent).toBe('ozzy');
	});
	test('should render adopt me button', async () => {
		act(() => {
			authStore.setUser('user');
			render(
				<BrowserRouter>
					<Details
						animal={{
							name: 'ozzy',
							description: 'test',
							breeds: { primary: '' },
							tags: ['1', '2']
						}}
					/>
				</BrowserRouter>,
				container
			);
		});
		expect(document.getElementById('adoptme__button').textContent).toBe(
			'Adopt me!'
		);
	});
});
