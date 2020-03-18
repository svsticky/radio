import React, { Component } from 'react';
import Poster from './Poster';
import GetContent from './Contentful';

export default class Ad extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      ads: []
    }
    
    GetContent('ads', entries => {
      this.setState({
        ads: entries !== null ? entries.map(entry => entry.fields) : []
      });
    });
  }

  render() {
    if (this.state.ads.length > 0) {
      if(this.props.current >= (this.state.ads.length - 1))
        this.props.onChange(true);
      
      let currentAd = this.state.ads[this.props.current];
      return (
        <div>
        <ul className='activities'>
          <h1>{currentAd.title}</h1>
          <p>
            {currentAd.description}
          </p>
        </ul>
        <Poster poster={`https:${currentAd.poster.fields.file.url}`}></Poster>
      </div>
      );
    }
    return <div></div>;
  }
}