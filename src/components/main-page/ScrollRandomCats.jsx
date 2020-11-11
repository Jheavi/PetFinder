import React, { useEffect } from 'react';
import './ScrollRandomCats.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { requestAnimals } from '../../redux/actions/animalsActions';

function ScrollRandomCats({ animals, actions }) {
	useEffect(() => {
		if (animals[0]?.type !== 'cat') {
			actions.requestAnimals('cat');
		}
	});

	return (
		<>
			<div className="cats-tittle">
				<p className="cats-tittle__text">Cats available for adoption</p>
			</div>
			<section className="scroll-cats">
				<ul className="scrollable">
					{animals?.map((animal, index) => {
						return (
							<li
								className="cat-card d-flex justify-content-center"
								key={index}
							>
								<Card
									id="cat-card-btn"
									style={{ width: '100vw' }}
									as={Link}
									to={`/details/${animal.id}`}
								>
									<Card.Body>
										<Card.Img
											className="horisontal-images"
											variant="top"
											src={animal.photos[0]?.medium}
										/>
										<Card.Title className="card-cat-tittle">
											{animal.name}
										</Card.Title>
									</Card.Body>
								</Card>
							</li>
						);
					})}
				</ul>
			</section>
		</>
	);
}

ScrollRandomCats.propTypes = {
	animals: PropTypes.shape([]).isRequired
};

function mapStateToProps({ animalsReducer }) {
	return {
		animals: animalsReducer
	};
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators({ requestAnimals }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollRandomCats);
