import React from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';

import './species-details.css';

import { Record } from '../item-details/item-details';
import { withRouter } from 'react-router-dom';

const SpeciesDetails = ({ history, match }) => {

  const swapiService = new SwapiService();

  const { id=3 } = match.params;

    const itemList = (
      <ItemList onItemSelected={(id) => history.push(id)}
        getDate={swapiService.getAllSpecies}/>
    );

    const speciesDetails = (
      <ItemDetails selectedPerson={id}
        getDate={swapiService.getSpecies}
        img={'https://starwars-visualguide.com/assets/img/species/'}>
        <Record field='classification' label='Classification'/>
        <Record field='height' label='Height'/>
        <Record field='lifespan' label='Lifespan'/>
      </ItemDetails>
    );

  return (

    <Row left={itemList} right={speciesDetails}/>
    
  )
};

export default withRouter(SpeciesDetails);