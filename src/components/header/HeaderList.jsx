import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BurgerButton from './BurgerButton';
import Button from 'react-bootstrap/Button';
import { signOut, signInWithGoogle } from '../../actions/auth-actions';
import authStore from '../../stores/auth-store';
import './Header.css';

function HeaderList() {
	const [user, setUser] = useState(authStore.getUser());

	function handleChange() {
		setUser(authStore.getUser());
	}

	useEffect(() => {
		authStore.addChangeListener(handleChange);

		return () => {
			authStore.removeChangeListener(handleChange);
		};
	}, [user]);

	function isSignInVisible() {
		return user ? (
			<Button
				variant="primary"
				className="log-button"
				id="header__logout"
				onClick={(event) => {
					event.preventDefault();
					signOut();
				}}
			>
				Logout
			</Button>
		) : (
			<Button
				variant="primary"
				className="log-button"
				id="header__login"
				onClick={(event) => {
					event.preventDefault();
					signInWithGoogle();
				}}
			>
				Login
			</Button>
		);
	}

	return (
		<header className="header" id="header-test">
			<BurgerButton />
			<Link to="/" className="d-flex align-items-center header-link">
				<img
					className="header__logo"
					src="https://trello-attachments.s3.amazonaws.com/5f9d3d8395a20040a815a80a/768x727/6b9e6b190008963e1377a82e5497b4c1/dogcat2.png"
					alt="logo"
				/>
				<p className="logo-name">PetFinder</p>
			</Link>
			<div className="flex-spacer2"></div>
			<div className="flex-spacer"></div>
			<div className="flex-spacer"></div>
			<div className="flex-spacer"></div>
			{isSignInVisible()}
			{user && <span>{`${user.email}`}</span>}
		</header>
	);
}
export default HeaderList;
