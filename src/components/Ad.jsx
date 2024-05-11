import React, { Component } from 'react';
import Poster from './Poster';
import GetContent from '../helpers/contentful';

export default class Ad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: [],
    };

    GetContent('ads', (entries) => {
      this.setState({
        ads: entries !== null ? entries.map((entry) => entry.fields) : [],
      });
    });
  }

  render() {
    if (this.state.ads.length <= 0)
      return (
        <div>
          <ul className="advertisement"></ul>
          <Poster poster={'https://public.svsticky.nl/.hidden/Backup-Ad.png'} />
        </div>
      );

    if (this.props.current >= this.state.ads.length - 1)
      this.props.onChange(true);

    let currentAd = this.state.ads[this.props.current];
    if (currentAd.fullscreen) {
      return (
        <div className="full-advertisement">
          <Poster poster={`https:${currentAd.poster.fields.file.url}`}></Poster>
        </div>
      );
    } else {
      return (
        <div>
          <ul className="advertisement">
            <h1>{currentAd.title}</h1>
            <p>{currentAd.description}</p>
          </ul>
          <Poster poster={`https:${currentAd.poster.fields.file.url}`}></Poster>
        </div>
      );
    }
  }
}
