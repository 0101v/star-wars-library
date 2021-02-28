import React from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import { Record } from '../item-details/item-details';

import './vehicles-details.css';
import { withRouter } from 'react-router-dom';

const VehiclesDetails = ({ history, match }) => {
  
  const swapiService = new SwapiService();
  
  const { id=4 } = match.params;


  const itemList = (
    <ItemList onItemSelected={(id) => history.push(id)}
               getDate={swapiService.getAllVehicles}/>
 );

  const vehiclesDetails = (
    <ItemDetails selectedPerson={id}
                getDate={swapiService.getVehicles}
                img={'https://starwars-visualguide.com/assets/img/vehicles/'}>
       <Record field='length' label='Length'/>
       <Record field='model' label='Model'/>
       <Record field='maxAtmospheringSpeed' label='Max speed'/>
       <Record field='crew' label='Crew'/>
       <Record field='passengers' label='Passengers'/>
       
    </ItemDetails>
  );

  return (
   <Row left={itemList} right={vehiclesDetails}/>
  )
  
};

export default withRouter(VehiclesDetails);