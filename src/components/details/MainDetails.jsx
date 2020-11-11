import React, { useState, useEffect } from 'react';
import './MainDetails.css';
import Details from './Details';
import SliderDetail from './SliderDetail';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { requestAnimal } from '../../redux/actions/animalsActions';

function MainDetails({ animal, actions, match }) {
	debugger;
	const [urlAnimalId] = useState(match.params.animalId);

	useEffect(() => {
		actions.requestAnimal(urlAnimalId);
	}, []);

	return (
		<main className="minvw">
			<SliderDetail animal={animal} />
			<Details animal={animal} />
		</main>
	);
}

MainDetails.propTypes = {
	animal: PropTypes.shape({}).isRequired,
	actions: PropTypes.shape({
		requestAnimal: PropTypes.func.isRequired
	}).isRequired
};

function mapStateToProps({ animalReducer }) {
	return {
		animal: animalReducer
	};
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators({ requestAnimal }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDetails);
