import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }
  }

  addTrack(track) {
    if(this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ){
      return;
    } else {
      this.setState(state => {
        return state.playlistTracks.push(track);
      })
    }
  }

  removeTrack(track) {
    for(let i=0; i<this.state.playlistTracks.length; i++) {
      if(this.state.playlistTracks[i].id === track.id) {
        this.setState(state => {
          return state.playlistTracks.splice(i, 1);
        })
      }
    }
  }

  handleNameChange(name) {
    this.setState({
      'playlistName': name,
    })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => {return track.uri});
    const playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName, trackURIs)
    .then(() => {
      console.log(`${this.state.playlistName} is created with ${this.state.playlistTracks.length}!`);
      this.setState({playlistName: 'New Playlist', playlistTracks: []});
    })
  }

  searchSpotify(term) {
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      })
    });
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.searchSpotify}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist title={this.state.playlistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.handleNameChange} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
