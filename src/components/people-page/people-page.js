import React from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';

import './people-page.css';

import { Record } from '../item-details/item-details';
import { withRouter } from 'react-router-dom';

const PeoplePage = ({ history, match }) => {

  const swapiService = new SwapiService();

  const { id=3 } = match.params;

    const itemList = (
      <ItemList onItemSelected={(id) => history.push(id)}
        getDate={swapiService.getAllPeople}/>
    );

    const personDetails = (
      <ItemDetails selectedPerson={id}
        getDate={swapiService.getPerson}
        img={'https://starwars-visualguide.com/assets/img/characters/'}>
        <Record field='gender' label='Gender'/>
        <Record field='height' label='Height'/>
        <Record field='birthYear' label='Birth Year'/>
        <Record field='eyeColor' label='Eye color'/>
      </ItemDetails>
    );

  return (

    <Row left={itemList} right={personDetails}/>
    
  )
};

export default withRouter(PeoplePage);