function TopTracks(props) {
    return (
        <div>
            {props.results.items.map(item => <p>{item.name}</p>)}
        </div>
    )
}

export default TopTracks;

async function fetchTopTracks() {
    let token = localStorage.getItem('access_token');
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });

    return await response.json();
}

export { fetchTopTracks };
