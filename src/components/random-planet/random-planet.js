import React from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator'

import './random-planet.css';

export default class RandomPlanet extends React.Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error:false
  };
  
  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateRandomPlanet = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  };

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
    loading: false,
    error: false})
  };

  updatePlanet = () => {
    const id = this.updateRandomPlanet(2, 19);
    this.swapiService.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  };

  render() {

    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;

    if (loading) {
      return <Spinner/>;
    }

    return (
      <div className="random-planet d-flex jumbotron">
        {errorMessage}
        {spinner}
        {content}    
      </div>
    )
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter, climate, gravity} = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
               src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
          <div>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="term">Population</span>
                <span>{population}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Rotation Period</span>
                <span>{rotationPeriod}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Diameter</span>
                <span>{diameter}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Climate</span>
                <span>{climate}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Gravity</span>
                <span>{gravity}</span>
              </li>
            </ul>
            
          </div>
    </React.Fragment>
  )
};