import './App.css';
import React, { useState } from 'react';
import LoginService from './services/Auth';
import md5 from 'md5';

const Login = ({ setIsPositive, setMessage, setShowMessage, setLoggedInUser }) => {
    // Komponentin tilan määritys
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
        event.preventDefault();
        var userForAuth = {
            username: username,
            password: md5(password) // Salataan md5 kirjaston metodilla
        };

        console.log("Lähetetään kirjautumispyyntö seuraavilla tiedoilla:", userForAuth); // Logataan pyyntö

        // Käytetään services/Auth.js tiedoston metodia
        LoginService.authenticate(userForAuth)
            .then(data => {
                console.log("Login response:", data); // Log the response

                // Talletetaan tietoja selaimen local storageen (f12 application välilehti)
                localStorage.setItem("username", data.username);
                localStorage.setItem("accesslevelId", data.accessLevelId); // Ensure correct casing
                localStorage.setItem("token", data.token);

                // Asetetaan app komponentissa olevaan stateen
                setLoggedInUser(data.username);

                setMessage(`Logged in as: ${userForAuth.username}`);
                setIsPositive(true);
                setShowMessage(true);

                setTimeout(() => {
                    setShowMessage(false);
                }, 5000);
            })
            .catch(error => {
                console.error("Virhe kirjautumisessa:", error); // Logataan virhe
                setMessage(error.response?.data?.message || 'Authentication failed'); // Näytetään virheviesti
                setIsPositive(false);
                setShowMessage(true);

                setTimeout(() => {
                    setShowMessage(false);
                }, 6000);
            });
    };

    // Kenttien tyhjennys
    const emptyFields = () => {
        setUsername("");
        setPassword("");
    };

    return (
        <div id="loginWindow">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>

                <input type='submit' value='Login' />
                <input type='button' value='Empty' onClick={emptyFields} />
            </form>
        </div>
    );
};

export default Login;