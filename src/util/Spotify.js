const clientID = 'b0db004c9d2c473f89fbc6190e742a5b';
const redirectURI = 'http://localhost:3000';
const tokenClientID = '19e26044114a49dfa408c0912012a725';
const authorUrl = `https://accounts.spotify.com/authorize?client_id=${tokenClientID}&redirect_uri=${redirectURI}&scope=playlist-modify-private&response_type=token&state=123`;
const searchUrl = 'https://api.spotify.com/v1/search';

let accessToken;
let expiresIn;
let userID;

const Spotify = {

  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }
    let url = window.location.href;
    accessToken = this.extract(url, "access_token=", "&");
    if(accessToken) {
      expiresIn = this.extract(url, "expires_in=", "&");
      window.setTimeout(() => accessToken = 'Access Token', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      console.log("access token successful retrieved.");
      return accessToken;
    } else {
      window.location.href = authorUrl;
    }
  },

  extract(string, keyword, limiter) {
    let startIndex = string.indexOf(keyword);
    if (startIndex !== -1) {
        // add the length of the keyword to the start position to get the "real" start
        startIndex += keyword.length;
        let endIndex = string.indexOf(limiter, startIndex);
        if (endIndex !== -1) {
            return string.slice(startIndex, endIndex);
        } else {
            return string.slice(startIndex);
        }
    }
    return undefined;
  },

  savePlaylist(name, trackURIs) {
    return fetch('https://api.spotify.com/v1/me', {headers: {
      Authorization: 'Bearer ' + this.getAccessToken()
    }}).then(response => {
      return response.json()
    }).then(jsonResponse => {
      userID = jsonResponse.id;
      return this.createPlaylist(userID, name, trackURIs);
    })
  },

  createPlaylist(userID, name, trackURIs) {
      const url = `https://api.spotify.com/v1/users/${userID}/playlists`;
      const headers = {
        'Authorization': 'Bearer ' + this.getAccessToken(),
        'Content-Type': 'application/json'
      };
      const body = JSON.stringify({name: name, public: false});
      return fetch(url, {headers: headers, method: 'POST', body: body})
      .then(response => {return response.json()})
      .then(jsonResponse => {
        let playlistID = jsonResponse.id;
        return this.addTracksToPlaylist(playlistID, trackURIs);
      })
  },

  addTracksToPlaylist(playlistID, trackURIs) {
    const headers = {
      'Authorization': 'Bearer ' + this.getAccessToken(),
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(trackURIs);
    return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      headers: headers, method: 'POST', body: body
    })
  },

  search(term) {
    return fetch(searchUrl + '?q=' + term + '&type=track',
      {
      headers: {
        Authorization: 'Bearer ' + this.getAccessToken()
      }
    }).then(response => {
      return response.json()
    }).then(jsonResponse => {
      if(!jsonResponse.tracks) {
        return ''
      } else {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.name,
            album: track.album.name,
            uri: track.uri
          }
        })
      }
    })
  },

}


export default Spotify;
