function TopTracks(props) {
    let top10Tracks = [];
    for (let i = 0; i < 10; i++) {
        top10Tracks.push(props.results.items[i]);
    }

    return (
        <div>
            <h2>Top Ten Songs</h2>
            <div className="grid">
                {top10Tracks.map(
                    item =>
                        <div className="grid-item">
                            <img src={item.album.images[0].url} height={200} width={200}></img>
                            <p>{item.name}</p>
                        </div>
                )}
            </div>
        </div>
    )
}

export default TopTracks;

async function fetchTopTracks() {
    let token = localStorage.getItem('access_token');
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });

    return await response.json();
}

export { fetchTopTracks };
