export function TopTracks(props) {
    return (
        <div className="topContainer" id="topTracksContainer">
            <div className="topItemsContainer">
                <div className="grid">
                    {props.results.items.map(
                        (item, index) =>
                            <div className="topItem">
                                <div className="item">
                                    <p className="mainText">{index + 1}. {item.name}</p>
                                    <p className="subText">{item.artists[0].name}</p>
                                </div>
                            </div>
                    )}
                </div>
            </div>
            <div className="titleContainer">
                <h1 className="subtitle">your top tracks</h1>
            </div>
        </div>
    )
}

export async function fetchTopTracks() {
    let token = localStorage.getItem('access_token');
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });

    return await response.json();
}
