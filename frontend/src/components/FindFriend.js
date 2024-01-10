import { useNavigate } from "react-router-dom";
import { useState } from "react";

let responseObject;

export function FindFriend() {
    const [toCompare, setToCompare] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const navigate = useNavigate();

    function handleInput() {
        setEnabled(true);
    }

    function handleClick() {
        let friendUserId = document.getElementById('textbox').value;
        const url = `http://localhost:4000/findFriend?userId=${localStorage.getItem('userID')}&friendUserId=${encodeURIComponent(friendUserId)}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP status ' + response.status);
                }
                return response.json();
            })
            .then((response) => {
                responseObject = response;
                console.log(responseObject);
                setToCompare(true);
            })
            .catch((error) => {
                console.error(`${error}`);
            });
    }

    if (toCompare) {
        navigate('/compare');
    } else {
        return (
            <div id="findFriendContainer">
                <div className="ffTitle">
                    <h1 className="titleText">time to comparify</h1>
                </div>

                <div className="ffContainer">
                    <div className="subContainer" id="instructionContainer">
                        <h1 className="subtitle" id="instructionTitle">how it works</h1>
                        <ol className="instructions">
                            <li className="mainText" id="instructionText">your spotify username is displayed on the right</li>
                            <li className="mainText" id="middleInstruction">ask your friend to login to spotify using comparify</li>
                            <li className="mainText" id="instructionText">after your friend logs in, enter their username in the textbox</li>
                        </ol>
                    </div>

                    <div className="subContainer">
                        <div id="userInfo">
                            <p className="infoText">your username: {localStorage.getItem("userID")}</p>
                        </div>

                        <div className="friendInfo">
                            <p className="infoText">your friend's username:</p>
                            <input type="text" id="textbox" onInput={handleInput}></input>
                            <button onClick={handleClick} style={enabled ? go : disabled}>
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export function getResponseObject() {
    return responseObject;
}

const go = {
    margin: "3vmin",
    color: "#6357e6",
    fontSize: "5vmin",
    border: "none",
    cursor: "pointer",
    backgroundColor: "transparent"
}

const disabled = {
    margin: "3vmin",
    color: "#dddddd",
    fontSize: "5vmin",
    border: "none",
    pointerEvents: "none",
    backgroundColor: "transparent"
}