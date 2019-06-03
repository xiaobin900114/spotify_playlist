import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderAction.bind(this);
    this.addTrack.bind(this);
    this.removeTrack.bind(this);
  }

  renderAction() {
    if(this.props.isRemoval) {
      return <button className="Track-action" onClick={this.removeTrack.bind(this, this.props.track)}>-</button>
    } else {
      return <button className="Track-action" onClick={this.addTrack.bind(this, this.props.track)}>+</button>
    }
  }

  addTrack(track) {
    this.props.onAdd(track);
  }

  removeTrack(track) {
    this.props.onRemove(track);
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}

export default Track;
