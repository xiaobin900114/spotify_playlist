import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    return this.props.onNameChange(e.target.value);
  }

  render() {
    return(
      <div className="Playlist">
        <input value={this.props.title} onChange={this.handleNameChange.bind(this)}/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

export default Playlist;
