import React from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import PeoplePage from '../people-page';
import StarshipsDetails from '../starships-details';
import VehiclesDetails from '../vehicles-details';
import SpeciesDetails from '../species-details';

import './app.css';

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

export default class App extends React.Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    })
  };

  componentDidCatch() {
    this.setState({ hasError: true })
  };

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator/>
    }
      
    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    return (
      <BrowserRouter>
        <div>

          <Header/>
          {planet}
          
          <button
            className="btn btn-warning btn-lg mb-4 ml-3"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton/>

          <Switch>
            <Route path='/' exact component={() => <h2>Hello, make a selection in the header</h2>}/>

            <Route path='/people/:id?' component={PeoplePage}/>

            <Route path='/starships/:id?' component={StarshipsDetails}/>
            
            <Route path='/vehicles/:id?' component={VehiclesDetails}/>    

            <Route path='/species/:id?' component={SpeciesDetails}/>

            <Redirect to='/'/>       
          </Switch>
          
        </div>
      </BrowserRouter>
    )
  }
}