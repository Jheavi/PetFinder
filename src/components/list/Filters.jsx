import React, { useEffect } from 'react';
import './Filters.css';
import { requestAnimals } from '../../actions/actions';
import store from '../../stores/principal-store';
import Button from 'react-bootstrap/Button';

function Filters({ type }) {
	const object = {
		type: ['dog', 'cat', 'horse', 'rabbit', 'small-furry'],
		age: ['baby', 'young', 'adult', 'senior'],
		gender: ['female', 'male']
	};

	useEffect(() => {
		setInitialCheckToSpeciesList(store.getUrlFilter());
	});

	function setInitialCheckToSpeciesList(urlObject) {
		urlObject.type = [type];
		const radioButtons = document.getElementsByClassName('inputRadio');
		const buttonType = Array.prototype.find.call(radioButtons, (element) => {
			return element.value === type;
		});
		if (buttonType) {
			buttonType.checked = true;
		}
	}

	function updateUrlObject(event, animalProperty, urlObject) {
		if (event.target.type === 'radio') {
			urlObject[animalProperty] = [event.target.value];
		} else {
			if (event.target.checked) {
				urlObject[animalProperty].push(`${event.target.value}`);
			} else {
				urlObject[animalProperty] = urlObject[animalProperty].filter(
					(element) => {
						return element !== `${event.target.value}`;
					}
				);
			}
		}
	}

	function applyFilters(urlObject) {
		requestAnimals(
			urlObject.type,
			urlObject.breed,
			urlObject.gender,
			urlObject.age
		);
		window.history.replaceState(
			null,
			'',
			`/list?type=${urlObject.type}&age=${urlObject.age.join(
				','
			)}&gender=${urlObject.gender.join(',')}`
		);
	}

	return (
		<>
			<section className="filter-container">
				<div className="horizontal-container-desktop">
					<div className="horizontal-container">
						<ul className="ks-cboxtags">
							<p className="checkbox__text">Specie</p>
							{object.type &&
								object.type.map((option, index) => {
									return (
										<li className="checkbox-li" key={index}>
											<input
												type="radio"
												id={`radio-${option}`}
												className="inputRadio"
												name="type"
												key={option}
												value={option}
												onChange={(event) => {
													updateUrlObject(event, 'type', store.getUrlFilter());
												}}
											></input>
											<label htmlFor="checkboxOne">
												{option.replace('-', ' ')}
											</label>
										</li>
									);
								})}
						</ul>
						<ul className="ks-cboxtags">
							<p className="checkbox__text">Age</p>
							{object.age &&
								object.age.map((option, index) => {
									return (
										<li className="checkbox-li" key={index}>
											<input
												type="checkbox"
												id={`checkboxAge-${option}`}
												className="inputBox"
												key={option}
												value={option}
												onChange={(event) => {
													updateUrlObject(event, 'age', store.getUrlFilter());
												}}
											></input>
											<label htmlFor="checkboxOne">{option}</label>
										</li>
									);
								})}
						</ul>
					</div>

					<ul className="ks-cboxtags">
						<p className="checkbox__text">Gender</p>
						{object.gender &&
							object.gender.map((option, index) => {
								return (
									<li className="checkbox-li" key={index}>
										<input
											type="checkbox"
											id={`checkboxGender-${option}`}
											className="inputBox"
											key={option}
											value={option}
											onChange={(event) => {
												updateUrlObject(event, 'gender', store.getUrlFilter());
											}}
										></input>
										<label htmlFor="checkboxOne">{option}</label>
									</li>
								);
							})}
					</ul>
				</div>
				<Button
					variant="primary"
					className="button-apply"
					onClick={() => {
						applyFilters(store.getUrlFilter());
					}}
				>
					Apply filters
				</Button>
			</section>
		</>
	);
}

export default Filters;
