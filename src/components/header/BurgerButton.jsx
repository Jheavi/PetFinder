import React from 'react';
import { Link } from 'react-router-dom';
import { requestAnimals } from '../../redux/actions/animalsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import store from '../../stores/principal-store';

function BurgerButton({ actions }) {
	let burgerClicked = false;

	function burgerClick() {
		burgerClicked = !burgerClicked;
		const firstMenu = document.getElementById('burger-firstMenu');
		const secondMenu = document.getElementById('burger-secondMenu');
		if (burgerClicked) {
			firstMenu.style.left = '-15px';
		} else {
			firstMenu.style.left = '-300px';
			secondMenu.style.left = '-300px';
		}
	}

	function speciesClick() {
		const secondMenu = document.getElementById('burger-secondMenu');
		secondMenu.style.left = '-15px';
	}

	function hideBurgerMenu() {
		const firstMenu = document.getElementById('burger-firstMenu');
		const secondMenu = document.getElementById('burger-secondMenu');
		firstMenu.style.left = '-300px';
		secondMenu.style.left = '-300px';
	}

	return (
		<div id="burger-container">
			<button
				id="burger-button"
				className="material-icons"
				onClick={() => {
					burgerClick();
				}}
			>
				menu
			</button>
			<ul id="burger-firstMenu" className="burger__menu">
				<li key="1">
					<button
						className="menu-button"
						id="first-menu__species"
						onClick={() => {
							speciesClick();
						}}
					>
						Species
					</button>
				</li>
				<li key="2">
					<Link
						to="/contact"
						className="menu-button"
						id="menu-button__Contact"
						onClick={() => {
							hideBurgerMenu();
						}}
					>
						Contact us
					</Link>
				</li>
				<li key="3">
					<Link
						to="/"
						className="menu-button"
						id="menu-button__Main"
						onClick={() => {
							hideBurgerMenu();
						}}
					>
						Main Page
					</Link>
				</li>
			</ul>
			<ul id="burger-secondMenu" className="burger__menu">
				<li key="1">
					<Link
						id="secondMenu__dogs"
						to={{ pathname: '/list', search: '?type=dog' }}
						className="menu-button"
						onClick={() => {
							actions.requestAnimals('dog');
							hideBurgerMenu();
							store.resetFilterOnClick('inputBox');
						}}
					>
						Dogs
					</Link>
				</li>
				<li key="2">
					<Link
						id="secondMenu__cats"
						to={{ pathname: '/list', search: '?type=cat' }}
						className="menu-button"
						onClick={() => {
							actions.requestAnimals('cat');
							hideBurgerMenu();
							store.resetFilterOnClick('inputBox');
						}}
					>
						Cats
					</Link>
				</li>
				<li key="3">
					<Link
						id="secondMenu__horses"
						to={{ pathname: '/list', search: '?type=horse' }}
						className="menu-button"
						onClick={() => {
							actions.requestAnimals('horse');
							hideBurgerMenu();
							store.resetFilterOnClick('inputBox');
						}}
					>
						Horses
					</Link>
				</li>
				<li key="4">
					<Link
						id="secondMenu__rabbits"
						to={{ pathname: '/list', search: '?type=rabbit' }}
						className="menu-button"
						onClick={() => {
							actions.requestAnimals('rabbit');
							hideBurgerMenu();
							store.resetFilterOnClick('inputBox');
						}}
					>
						Rabbits
					</Link>
				</li>
				<li key="5">
					<Link
						id="secondMenu__small-animals"
						to={{ pathname: '/list', search: '?type=small-furry' }}
						className="menu-button"
						onClick={() => {
							actions.requestAnimals('small-furry');
							hideBurgerMenu();
							store.resetFilterOnClick('inputBox');
						}}
					>
						Small furry animals
					</Link>
				</li>
			</ul>
		</div>
	);
}

BurgerButton.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BurgerButton);
