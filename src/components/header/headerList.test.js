import HeaderList from './HeaderList';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import * as authActions from '../../actions/auth-actions';
import authStore from '../../stores/auth-store';

jest.mock('../../actions/auth-actions');

describe('HeaderList', () => {
	let container;
	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
		act(() => {
			render(
				<BrowserRouter>
					<HeaderList />
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
		expect(container.querySelector('.logo-name').textContent).toBe('PetFinder');
	});

	test('should call signInWithGoogle', () => {
		const loginButton = document.getElementById('header__login');
		act(() => {
			loginButton.dispatchEvent(
				new MouseEvent('click', { bubbles: true, cancelable: true })
			);
		});
		expect(authActions.signInWithGoogle).toHaveBeenCalledTimes(1);
	});

	test('should call signOut if user', async () => {
		authStore.setUser('user');
		await waitFor(() => {
			authStore.emitChange();
		});

		const logoutButton = document.getElementById('header__logout');

		logoutButton.dispatchEvent(
			new MouseEvent('click', { bubbles: true, cancelable: true })
		);

		expect(authActions.signOut).toHaveBeenCalledTimes(1);
	});
});
