function Compare() {
    return (
        <div>
            <h3>Your User ID: {localStorage.getItem('userID')}</h3>
            <p>Input your friend's user ID here:</p>
            <input id='textbox' type="text"></input>
            <button onClick={handleClick}>Click to compare</button>
        </div>
    )
}

export default Compare

function handleClick() {
    let friendUserId = document.getElementById('textbox').value;

    fetch(`http://localhost:4000/callback/compare`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendUserId),
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
