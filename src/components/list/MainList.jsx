import React from 'react';
import Filters from './Filters';
import List from './List';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

function MainList({ animals }) {
	return (
		<main className="main-container-list">
			<Filters animals={animals} />
			<List animals={animals} />
		</main>
	);
}

MainList.propTypes = {
	animals: PropTypes.shape([]).isRequired
};

function mapStateToProps({ animalsReducer }) {
	return {
		animals: animalsReducer
	};
}

export default connect(mapStateToProps)(MainList);
