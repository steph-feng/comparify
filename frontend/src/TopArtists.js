function TopArtists(props) {
    let top10Artists = [];
    for (let i = 0; i < 10; i++) {
        top10Artists.push(props.results.items[i]);
    }
    
    return (
        <div>
            <h2>Top Ten Artists</h2>
            <div className="grid">
                {top10Artists.map(
                    item =>
                        <div className="grid-item">
                            <img src={item.images[0].url} height={200} width={200}></img>
                            <p>{item.name}</p>
                        </div>
                )}
            </div>
        </div>
    )
}

export default TopArtists;

async function fetchTopArtists() {
    let token = localStorage.getItem('access_token');
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=20&time_range=short_term', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });

    return await response.json();
}

export { fetchTopArtists }
