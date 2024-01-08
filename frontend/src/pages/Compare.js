import { getResponseObject } from "./FindFriend";
import { useState, useEffect } from "react";

function Compare() {
    const [user, setUser] = useState(null);
    const [friend, setFriend] = useState(null);
  
    useEffect(() => {
      const responseObject = getResponseObject();
      setUser(responseObject.currentUserData);
      setFriend(responseObject.friendUserData);
    }, []);

    if (!friend){
        return <p>User not found please try again</p>;
    }
    
    let commonArtists = [];
    user.topArtistsNames.forEach(userElement => {
        friend.topArtistsNames.forEach(friendElement => {
            if (userElement === friendElement) {
                commonArtists.push(userElement);
            }
        })
    });

    let commonSongs = [];
    user.topTracksNames.forEach(userElement => {
        friend.topTracksNames.forEach(friendElement => {
            if (userElement === friendElement) {
                commonSongs.push(userElement);
            }
        })
    });

    let commonGenres =[];
    user.artistGenres.forEach(userElement => {
        friend.artistGenres.forEach(friendElement => {
            if (userElement === friendElement) {
                if (!commonGenres.includes(userElement)){
                    commonGenres.push(userElement);
                }
            }
        })
    });

    return (
        <div>
            <h2>Artists in Common</h2>
            {commonArtists.map(item => <p>{item}</p>)}
            <h2>Songs in Common</h2>
            {commonSongs.map(item => <p>{item}</p>)}
            <h2>Genres in Common</h2>
            {commonGenres.map(item => <p>{item}</p>)}
        </div>
    )
}

export default Compare