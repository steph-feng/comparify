import { getResponseObject } from "../components/FindFriend";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Compare() {
    const [user, setUser] = useState(null);
    const [friend, setFriend] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const responseObject = getResponseObject();
        setUser(responseObject.currentUserData);
        setFriend(responseObject.friendUserData);
    }, []);

    function handleClick() {
        navigate('/');
    }

    if (friend == null) {
        return (
            <div className="fullSizeContainer" id="similarContainer">
                <p className="errorText">your friend was not found, please try again</p>
                <button className="backButton" onClick={handleClick}>←</button>
            </div>
        )
    }

    let commonArtists = [];
    user.topArtistsNames.forEach(userElement => {
        friend.topArtistsNames.forEach(friendElement => {
            if (userElement === friendElement) {
                commonArtists.push(userElement);
            }
        })
    });

    let commonTracks = [];
    user.topTracksNames.forEach(userElement => {
        friend.topTracksNames.forEach(friendElement => {
            if (userElement === friendElement) {
                commonTracks.push(userElement);
            }
        })
    });

    let commonGenres = [];
    user.topGenres.forEach(userElement => {
        friend.topGenres.forEach(friendElement => {
            if (userElement === friendElement) {
                commonGenres.push(userElement);
            }
        })
    });

    // calculating similarity score
    let avgNumGenres = (user.topGenres.length + friend.topGenres.length) / 2;
    let avgPopularity = (user.popularity + friend.popularity) / 200;

    let similarity = (((commonGenres.length / avgNumGenres) * 0.5) +
        ((commonArtists.length / 10) * 0.17) +
        ((commonTracks.length / 10) * 0.17) +
        (avgPopularity * 0.16)) * 100;

    let rounded = similarity.toFixed(1).toString().split("");

    return (
        <div id="compareContainer">
            <div className="fullSizeContainer" id="similarContainer">
                <h1 className="compareTitle">you and {friend.displayName.split(" ")[0]} are</h1>
                <div className="wavyText">
                    {rounded.map((item, index) => <h1 className="waveText" style={{ '--i': (index + 1) }}>{item}</h1>)}
                    <h1 className="waveText" style={{ '--i': (rounded.length + 1) }}>%</h1>
                </div>
                <h1 className="compareTitle">similar</h1>

                <div id="arrowWrapper" className="topMarginArrow">
                    <a href="#commonContainer">
                        <button className="downArrow" id="toArtistsArrow"></button>
                    </a>
                </div>
            </div>

            <div className="fullSizeContainer" id="commonContainer">
                <div className="commonTitle" >
                    <h1 className="errorText transparentBackground">you both listen to:</h1>
                </div>

                <div className="commonItems">
                        <div className="thirdSize lightPurple">
                            <h1 className="blueUnderlineText">artists</h1>
                            <div className="commonGroup">
                                {commonArtists.map((item, index) => <p className="commonItem">{index + 1}. {item}</p>)}
                            </div>
                        </div>
                        <div className="thirdSize lightBlue">
                            <h1 className="purpleUnderlineText">tracks</h1>
                            <div className="commonGroup">
                                {commonTracks.map((item, index) => <p className="commonItem">{index + 1}. {item}</p>)}
                            </div>
                        </div>
                        <div className="thirdSize lightPurple">
                            <h1 className="blueUnderlineText">genres</h1>
                            <div className="commonGroup">
                                {commonGenres.map((item, index) => <p className="commonItem">{index + 1}. {item}</p>)}
                            </div>
                        </div>

                </div>

                <button className="backButton" onClick={handleClick}>←</button>
            </div>
        </div>
    )
}


export default Compare