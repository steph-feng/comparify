export function LandingPage() {
    return (
        <div id="landingPageContainer">
            <h1 id="title">comparify</h1>
            <button id="startButton" onClick={handleLogin}>
                <svg stroke="#1DB954" fill="#1DB954" viewBox="0 0 496 512" height="2.5vh" width="2.5vh"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 
                    364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 
                    0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 
                    15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 
                    0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 
                    11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 
                    1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 
                    15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path>
                </svg>
                <p id="buttonText">login with spotify</p>
            </button>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
        </div>
    );
}

// Spotify authorization code flow

const clientId = 'a357c65627404b7399e0f41a59410bf3';
const redirectUri = 'http://localhost:3000/callback';

function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
}

let codeVerifier = generateRandomString(128);

function handleLogin() {
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
        let state = generateRandomString(16);
        let scope = 'user-top-read user-read-private user-read-email';

        localStorage.setItem('code_verifier', codeVerifier);

        let loginParams = new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge
        });

        window.location = 'https://accounts.spotify.com/authorize?' + loginParams;
    });
}
