import React from 'react';

import './error-button.css';

export default class ErrorButton extends React.Component {
  
  state = {
    renderError: false
  };

  render() {
    if (this.state.renderError) {
      this.test.error = true;
    }
    
    return (
      <button className='btn btn-danger btn-lg mb-4 ml-2'
        onClick={() => this.setState({ renderError: true })}>
        Error
      </button>
    )
  }
}