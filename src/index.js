import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Footer from './components/footer/Footer';
import MainDetails from './components/details/MainDetails';
import MainList from './components/list/MainList';
import MainPage from './components/main-page/MainPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/details/:animalId" component={MainDetails} />
        <Route path="/list" component={MainList} />
      </Switch>
    </BrowserRouter>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
