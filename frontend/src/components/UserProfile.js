export function UserProfile(props) {
    return (
        <div id="userProfileContainer">
            <h1 className="title">welcome {props.results.display_name.toLowerCase()}</h1>
            <p className="description">see your insights below</p>
            <div id="arrowWrapper">
                <a href="#topArtistsContainer">
                    <button className="downArrow"></button>
                </a>
            </div>
        </div>
    )
}

export async function fetchUserProfile() {
    let token = localStorage.getItem('access_token');
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });

    return await response.json();
}

