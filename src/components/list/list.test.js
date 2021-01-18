import React from 'react';
import List from './List';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import * as actions from '../../actions/actions';

jest.mock('../../actions/actions');

describe('List', () => {
	let container;
	describe('standard list', () => {
		beforeEach(() => {
			container = document.createElement('div');
			document.body.appendChild(container);
			act(() => {
				render(
					<BrowserRouter>
						<List
							animals={[
								{
									name: 'Kitty',
									photos: [{ medium: '' }],
									breeds: { primary: '' }
								}
							]}
						/>
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

		test('should render standard list', () => {
			expect(container.querySelector('[data-testid="name"]').textContent).toBe(
				'Kitty'
			);
		});

		test('should call requestAnimal with click', () => {
			const cardButton = document.querySelector('.card-pets');
			act(() => {
				cardButton.dispatchEvent(
					new MouseEvent('click', { bubbles: true, cancelable: true })
				);
			});
			expect(actions.requestAnimal).toHaveBeenCalled();
		});
	});

	describe('adopted animals list', () => {
		beforeEach(() => {
			container = document.createElement('div');
			document.body.appendChild(container);
			act(() => {
				render(
					<BrowserRouter>
						{' '}
						<List
							animals={[
								{
									name: 'Kitty',
									photos: [],
									breeds: { primary: '' },
									status: 'adopted'
								}
							]}
						/>
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

		test('should render adopted list', () => {
			const adoptedImg = document.querySelector('#adopted-img')
			expect(adoptedImg).not.toBeNull();
		});
	});
});
