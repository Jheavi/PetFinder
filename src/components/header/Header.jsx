import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BurgerButton from './BurgerButton';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { requestAnimals } from '../../redux/actions/animalsActions';
import store from '../../stores/principal-store';
import { signOut, signInWithGoogle } from '../../actions/auth-actions';
import authStore from '../../stores/auth-store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import './Header.css';

function Header({ actions }) {
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
			<DropdownButton id="dropdown-species" title="Select specie">
				<Dropdown.Item
					as={Link}
					to={{ pathname: '/list', search: '?type=dog' }}
					className="species__options"
					id="dropdown-species__dogs"
					onClick={() => {
						actions.requestAnimals('dog');
						store.resetFilterOnClick('inputBox');
					}}
				>
					Dogs
				</Dropdown.Item>
				<Dropdown.Item
					as={Link}
					to={{ pathname: '/list', search: '?type=cat' }}
					id="dropdown-species__cats"
					className="species__options"
					onClick={() => {
						actions.requestAnimals('cat');
						store.resetFilterOnClick('inputBox');
					}}
				>
					Cats
				</Dropdown.Item>
				<Dropdown.Item
					as={Link}
					to={{ pathname: '/list', search: '?type=horse' }}
					id="dropdown-species__horses"
					className="species__options"
					onClick={() => {
						actions.requestAnimals('horse');
						store.resetFilterOnClick('inputBox');
					}}
				>
					Horses
				</Dropdown.Item>
				<Dropdown.Item
					as={Link}
					to={{ pathname: '/list', search: '?type=rabbit' }}
					id="dropdown-species__rabbits"
					className="species__options"
					onClick={() => {
						actions.requestAnimals('rabbit');
						store.resetFilterOnClick('inputBox');
					}}
				>
					Rabbits
				</Dropdown.Item>
				<Dropdown.Item
					as={Link}
					to={{ pathname: '/list', search: '?type=small-furry' }}
					id="dropdown-species__small-animals"
					className="species__options"
					onClick={() => {
						actions.requestAnimals('small-furry');
						store.resetFilterOnClick('inputBox');
					}}
				>
					Small furry animals
				</Dropdown.Item>
			</DropdownButton>
			<div className="flex-spacer"></div>
			{isSignInVisible()}
			{user && <span>{`${user.email}`}</span>}
		</header>
	);
}

Header.propTypes = {
	actions: PropTypes.shape({
		requestAnimals: PropTypes.func.isRequired
	}).isRequired
};

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators({ requestAnimals }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
