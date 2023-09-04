import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TopArtists, { fetchTopArtists } from './TopArtists';
import TopTracks, { fetchTopTracks } from './TopTracks';

const clientId = 'a357c65627404b7399e0f41a59410bf3';
const redirectUri = 'http://localhost:3000/callback';

function Callback() {
    const navigate = useNavigate();
    const [topArtistsResults, setTopArtistsResults] = useState();
    const [topTracksResults, setTopTracksResults] = useState();
    const [fetchingArtists, setFetchingArtists] = useState(true);
    const [fetchingTracks, setFetchingTracks] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            const accessParams = new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                client_id: clientId,
                code_verifier: localStorage.getItem('code_verifier'),
            });

            fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: accessParams,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('HTTP status ' + response.status);
                    }
                    return response.json();
                })
                .then((data) => {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('expires_in', data.expires_in);
                    localStorage.setItem('refresh_token', data.refresh_token);

                    Promise.all([fetchTopArtists(), fetchTopTracks()])
                        .then(([artists, tracks]) => {
                            setTopArtistsResults(artists);
                            setTopTracksResults(tracks);
                            setFetchingArtists(false);
                            setFetchingTracks(false);

                            const dataToSend = {
                                topArtistsResults: artists,
                                topTracksResults: tracks,
                            };

                            saveDataToMongo(dataToSend);

                        })
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
    }, [navigate]);

    if (fetchingArtists || fetchingTracks) {
        return (
            <div>
                <p>loading</p>
            </div>
        );
    } else {
        return (
            <div>
                <TopArtists results={topArtistsResults} />
                <TopTracks results={topTracksResults} />
            </div>
        )
    }
}

function saveDataToMongo(data) {
    fetch(`http://localhost:4000/callback/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }
            return response.json();
        })
        .then((response) => {
            console.log(`Data saved successfully: ${response.message}`);
        })
        .catch((error) => {
            console.error(`Error saving data: ${error}`);
        });
}


export default Callback;
