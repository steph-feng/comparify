async function fetchUserProfile() {
    let token = localStorage.getItem('access_token');
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });

    return await response.json();
}

export { fetchUserProfile }