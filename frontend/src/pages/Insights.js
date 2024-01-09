import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TopArtists, fetchTopArtists } from '../components/TopArtists';
import { TopTracks, fetchTopTracks } from '../components/TopTracks';
import { UserProfile, fetchUserProfile } from '../components/UserProfile';
import { GenrePopularity } from '../components/GenrePopularity';

const clientId = 'a357c65627404b7399e0f41a59410bf3';
const redirectUri = 'http://localhost:3000/insights';

export function Insights() {
    const [userResults, setUserResults] = useState();
    const [topArtistsResults, setTopArtistsResults] = useState();
    const [topTracksResults, setTopTracksResults] = useState();
    const [topGenres, setTopGenres] = useState();
    const [popularity, setPopularity] = useState();

    const [fetchingUser, setFetchingUser] = useState(true);
    const [fetchingArtists, setFetchingArtists] = useState(true);
    const [fetchingTracks, setFetchingTracks] = useState(true);

    const [toFindFriend, setToFindFriend] = useState(false);
    const navigate = useNavigate();

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

                    Promise.all([fetchUserProfile(), fetchTopArtists(), fetchTopTracks()])
                        .then(([user, artists, tracks]) => {
                            setUserResults(user);
                            setTopArtistsResults(artists);
                            setTopTracksResults(tracks);

                            let sortedGenres = sortGenres(artists.items);
                            setTopGenres(sortedGenres);
                            
                            let finalPopularity = getPopularity(artists, tracks)
                            setPopularity(finalPopularity);

                            setFetchingUser(false);
                            setFetchingArtists(false);
                            setFetchingTracks(false);

                            const dataToSend = {
                                userResults: user,
                                topArtistsResults: artists,
                                topTracksResults: tracks,
                                topGenreResults: sortedGenres,
                                popularityScore: finalPopularity
                            };

                            saveDataToMongo(dataToSend);
                            localStorage.setItem('userID', user.id)

                        })
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, []);

    if (fetchingUser || fetchingArtists || fetchingTracks) {
        return (
            <div className="insightsContainer">
                <div id="loader"> </div>
                <div id="loaderText">loading!</div>
            </div>

        );
    } else {
        if (toFindFriend) {
            navigate('/findFriend');
        } else {
            return (
                <div>
                    <UserProfile results={userResults} />
                    <TopArtists results={topArtistsResults} />
                    <TopTracks results={topTracksResults} />
                    <GenrePopularity genres={topGenres} popularity={popularity} />
                    <button onClick={() => setToFindFriend(true)}>next</button>
                </div>
            )
        }
    }
}

function saveDataToMongo(data) {
    fetch(`http://localhost:4000/save`, {
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
            console.log(`${response.message}`);
        })
        .catch((error) => {
            console.error(`${error}`);
        });
}

function sortGenres(artists) {
    let map = {};

    for (let i = 0; i < artists.length; i++) {
        let listGenres = artists[i].genres;
        for (let j = 0; j < listGenres.length; j++) {
            let value = listGenres[j];
            if (map[value] == null) {
                map[value] = 1;
            } else {
                map[value]++;
            }
        }
    }

    let keys = Object.keys(map);

    function compare(a, b) {
        if (map[a] < map[b]) {
            return 1;
        } else if (map[a] > map[b]) {
            return -1;
        }

        return 0;
    }

    return keys.sort(compare);
}

function getPopularity(artists, tracks) {
    let artistsPopularity = artists.items.map(item => item.popularity);
    let tracksPopularity = tracks.items.map(item => item.popularity);

    let popularityArray = artistsPopularity.concat(tracksPopularity);
    let sum = 0;

    popularityArray.forEach((element) => {
        sum = sum + element;
    })

    return sum / popularityArray.length;
}




