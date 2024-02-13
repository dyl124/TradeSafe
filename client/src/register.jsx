import React, { useState } from 'react';
import './register.css'; // Import your CSS file

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Send register mutation request to your GraphQL server
            const response = await fetch('http://localhost:3001/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
                            addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
                                token
                                user {
                                    _id
                                    firstName
                                    lastName
                                    email
                                }
                            }
                        }
                    `,
                    variables: {
                        firstName,
                        lastName,
                        email,
                        password,
                    },
                }),
            });
    
            const { data } = await response.json();
    
            window.location.href = "http://localhost:3000/login";
            alert('successfully signed up.');
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div>

            <h2>Register</h2>  
                  <div className="register-container">

            <form className="register-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Register</button>
            </form>
            <p>Otherwise you can login here <a href="http://localhost:3000/login">Login</a></p>

        </div>
        </div>

    );
}

export default Register;
