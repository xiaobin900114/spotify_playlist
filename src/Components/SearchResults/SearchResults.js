import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js'

const test = {
  name:'test2',
  artist:'test2',
  album:'test2',
  id: 'test2'
};

class SearchResults extends React.Component {
  render() {
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
      </div>
    )
  }
}

export default SearchResults;
