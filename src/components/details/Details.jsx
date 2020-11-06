import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import authStore from '../../stores/auth-store';
import './Details.css';

function Details({ animal }) {
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
	return (
		<>
			<div className="details-donating">
				<section id="details" className="animal__section">
					<Card className="mb-4" style={{ width: '95vw' }}>
						<Card.Body>
							<Card.Title className="card-details-title" id="animal__name">
								{animal?.name}
							</Card.Title>
							<Card.Subtitle id="description" className="mb-2 text-muted">
								Description:
							</Card.Subtitle>
							<Card.Text>{animal?.description}</Card.Text>
							<section className="description__section">
								<div className="card__flex">
									<Card.Subtitle className="mb-2 text-muted">
										Specie:
									</Card.Subtitle>
									<Card.Text className="card__text">
										{animal?.species}
									</Card.Text>
								</div>
								<div className="card__flex">
									<Card.Subtitle className="mb-2 text-muted">
										Age:
									</Card.Subtitle>
									<Card.Text className="card__text">{animal?.age}</Card.Text>
								</div>
								<div className="card__flex">
									<Card.Subtitle className="mb-2 text-muted">
										Breed:
									</Card.Subtitle>
									<Card.Text className="card__text">
										{animal?.breeds.primary}
									</Card.Text>
								</div>
								<div className="card__flex">
									<Card.Subtitle className="mb-2 text-muted">
										Size:{' '}
									</Card.Subtitle>
									<Card.Text className="card__text">{animal?.size}</Card.Text>
								</div>
								<div className="card__flex">
									<Card.Subtitle className="mb-2 text-muted">
										Status:
									</Card.Subtitle>
									<Card.Text className="text-capitalize card__text">
										{animal?.status}
									</Card.Text>
								</div>
							</section>
							<section className="tags">
								{animal?.tags.length > 0 && (
									<>
										<span>Tags:</span>
										<div className="tag__names">
											{animal?.tags.map((tag, index) => {
												return (
													<span key={`${index}`} className="tag__name">
														{tag}
													</span>
												);
											})}
										</div>
									</>
								)}
							</section>
							{user ? (
								<Link to="/adoption" id="adoptme__button">
									<Button variant="primary">Adopt me!</Button>
								</Link>
							) : (
								<div>
									<Button disabled variant="primary">
										Login to adopt!
									</Button>
								</div>
							)}
							<img
								className="logo__detail"
								src="https://trello-attachments.s3.amazonaws.com/5f9d3d8395a20040a815a80a/768x727/6b9e6b190008963e1377a82e5497b4c1/dogcat2.png"
								alt=""
							/>
						</Card.Body>
					</Card>
				</section>
				<section id="donating">
					<Card id="donating__card" className="mb-4 p-4  donate__image">
						<Card.Body>
							<Button
								id="donate-button"
								className="mb-3"
								variant="primary"
								size="lg"
								block
							>
								Donate!
							</Button>
							<Card.Img
								className="donate__inside-img"
								variant="top"
								src="https://trello-attachments.s3.amazonaws.com/5f9bf9da4ef72b5e96d70d02/5f9bfce5c6ad214b224696c9/d1990c6a6508004187186855e9395ddf/IMG_7381.jpg"
							/>
						</Card.Body>
					</Card>
				</section>
			</div>
		</>
	);
}

export default Details;
