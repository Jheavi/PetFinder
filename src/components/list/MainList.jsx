import React from 'react';
import Filters from './Filters';
import List from './List';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

function MainList({ animals }) {
	const params = new URLSearchParams(window.location.search.substring(1));
	const type = params.get('type');

	return (
		<main className="main-container-list">
			<Filters type={type} animals={animals} />
			<List animals={animals} />
		</main>
	);
}

MainList.propTypes = {
	animals: PropTypes.shape({}).isRequired
};

function mapStateToProps({ animals }) {
	return {
		animals
	};
}

export default connect(mapStateToProps)(MainList);
