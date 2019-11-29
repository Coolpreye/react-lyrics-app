import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
    state = {
        trackTitle: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = ( dispatch, e ) => {
        e.preventDefault();

        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${'19fa6e46d4d55f70477b517e2c44806e'}`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
                });

                this.setState({ trackTitle: '' });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i> Search For A Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input 
                                        placeholder="Song titel..." 
                                        type="text" 
                                        className="form-control form-control-lg"
                                        name="trackTitle"
                                        value={this.state.trackTitle}
                                        onChange={this.handleChange} 
                                    />
                                    <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
                                        Get Track Lyrics
                                    </button>
                                </div>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search;
