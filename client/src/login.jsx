import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
    
            const response = await fetch('http://localhost:3001/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `
                        mutation Login($email: String!, $password: String!) {
                            login(email: $email, password: $password) {
                                token
                                user {
                                    _id
                                    email
                                }
                            }
                        }
                    `,
                    variables: {
                        email,
                        password
                    }
                })
            });
    
            const { data, errors } = await response.json();
    
            if (data && data.login && data.login.token) {
                const { token, user } = data.login;
    
                // Store token in local storage
                localStorage.setItem('token', token);
    
                // Redirect to dashboard or any other page
                window.location.href = "http://localhost:3000/";
                alert('Successfully logged in!')
            } else if (errors && errors.length > 0) {
                // Handle errors, display error messages to the user
                setError(errors[0].message);
                alert('somthing didnt work!')
            }
        } catch (error) {
            // Handle network errors or other exceptions
            setError('An error occurred while logging in.');
            console.error('Error:', error);
            alert('somthing didnt work!')

        }
    };
    
    
    
    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit">Login</button>
                <p>Otherwise you can register here <a href="http://localhost:3000/register">Register</a></p>
            </form>
        </div>
    );
}

export default Login;
