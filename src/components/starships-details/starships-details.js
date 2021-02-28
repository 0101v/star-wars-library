import React from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';

import './starships-details.css';
import { Record } from '../item-details/item-details';
import { withRouter } from 'react-router-dom';

const StarshipsDetails = ({ history, match }) => {

  const swapiService = new SwapiService();

  const { id=9 } = match.params;

  const itemList = (
    <ItemList onItemSelected={(id) => history.push(id)}
      getDate={swapiService.getAllStarships}/>
  );

  const starshipsDetails = (
    <ItemDetails selectedPerson={id}
      getDate={swapiService.getStarship}
      img={'https://starwars-visualguide.com/assets/img/starships/'}>
        <Record field='length' label='Length'/>
        <Record field='model' label='Model'/>
        <Record field='maxAtmospheringSpeed' label='Max Speed'/>
        <Record field='crew' label='Crew'/>
        <Record field='passengers' label='Passengers'/>
    </ItemDetails>
  );

  return (
    <Row left={itemList} right={starshipsDetails}/>
  )
  
};

export default withRouter(StarshipsDetails);