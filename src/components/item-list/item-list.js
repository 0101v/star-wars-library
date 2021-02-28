import React from 'react';
import ErrorIndicator from '../error-indicator';

import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends React.Component {

  state = {
    itemList: null,
    error: false
  };

  componentDidMount() {

    const { getDate } = this.props;

    getDate()
      .then((itemList) => {
        this.setState({
          itemList
        })
      })
      .catch(() => {
        this.setState({error: true})
      })
  };

  renderItems(arr) {
    return arr.map(({ id, name }) => {
      return (
        <li className='list-group-item'
        key={id}
        onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      )
    })
  };

  render() {

    if(this.state.error) {
      return <ErrorIndicator/>
    }

    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner/>
    }

    const items = this.renderItems(itemList);

    return (
      <ul className='item-list list-group'> 
        {items}
      </ul>
    )
  }
}
