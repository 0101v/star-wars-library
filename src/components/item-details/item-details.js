import React from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';

import './item-details.css';
import ErrorIndicator from '../error-indicator';

const Record = ({ person, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}:</span>
      <span>{person[field]}</span>
    </li>
  )
};

export {
  Record
};

export default class ItemDetails extends React.Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true,
    error: false
  };

  componentDidMount() {
    this.updateItem();
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedPerson !== prevProps.selectedPerson) {
      this.updateItem();
    }
  };

  updateItem = () => {

    const { getDate, selectedPerson } = this.props;
    if (!selectedPerson) return;

    this.setState({loading: true});

    getDate(selectedPerson)
      .then((person) => {
        this.setState({ person })
      })
      .catch(() => {
        this.setState({error: true})
      });

    setTimeout(() => this.setState({loading: false}), 2000);
  };

  render() {

    if (this.state.error) {
      return <ErrorIndicator/>
    }

    if (!this.state.person) {
      return <span> Select person from list</span>
    }
    
    const { person } = this.state;
    const { id, name} = this.state.person;
    const { loading } = this.state;
    const img = this.props.img + id + '.jpg';

    const dital = <React.Fragment>
                    <img className="item-image"
                      src={img}
                      alt='item'/>

                    <div className="card-body">
                      <h4>{name}</h4>
                      <ul className="list-group list-group-flush">
                        {
                          React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {person});
                            })
                        }
                      </ul>
                    </div>
                  </React.Fragment>;

    const timeDelay = loading ? <Spinner/> : dital;

    return (
      <div className="item-details card">
        {timeDelay}
      </div>
    )
  }
}