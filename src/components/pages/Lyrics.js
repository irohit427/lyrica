import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: ''
    }

    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(res => {
                this.setState({lyrics: res.data.message.body.lyrics.lyrics_body})
                return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_API_KEY}`)
                .then(res => {
                    this.setState({track : res.data.message.body.track})
                }).catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        const {track, lyrics} = this.state;
        if (track === undefined || Object.keys(track).length === 0) {
            return <Spinner />
        } else {
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                    <h5>
                        <div className="card">
                            <div className="card-header">
                                {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
                            </div>
                        </div>
                    </h5>
                    <div className="card-body">
                        <div className="card-text">{lyrics}</div>
                    </div>

                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>Album Name: </strong> {track.album_name}
                        </li>
                    </ul>
                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>Genre: </strong> { track.primary_genres.music_genre_list.map(genre => (
                                genre.music_genre.music_genre_name
                            ))}
                        </li>
                    </ul>
                </React.Fragment>
            )
        }
    }
}

export default Lyrics;