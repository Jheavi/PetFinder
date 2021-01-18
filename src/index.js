import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import HeaderList from './components/header/HeaderList';
import './index.css';
import Footer from './components/footer/Footer';
import MainDetails from './components/details/MainDetails';
import MainList from './components/list/MainList';
import MainPage from './components/main-page/MainPage';
import Adoption from './components/adoption/Adoption';
import Contact from './components/contact/Contact';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Route path="/list" exact component={HeaderList} />
				<Route path="/" component={Header} />
			</Switch>
			<Switch>
				<Route path="/" exact component={MainPage} />
				<Route path="/details/:animalId" component={MainDetails} />
				<Route path="/list" component={MainList} />
				<Route path="/adoption" component={Adoption} />
				<Route path="/contact" component={Contact} />
			</Switch>
			<Footer />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
