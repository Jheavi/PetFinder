import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import HeaderList from './components/header/HeaderList';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Footer from './components/footer/Footer';
import MainDetails from './components/details/MainDetails';
import MainList from './components/list/MainList';
import MainPage from './components/main-page/MainPage';
import Adoption from './components/adoption/Adoption';
import Contact from './components/contact/Contact';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { requestAnimals } from './redux/actions/animalsActions';

const store = configureStore({ animals: [], animal: { id: null } });

store.dispatch(requestAnimals('cat'));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
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
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
reportWebVitals();
