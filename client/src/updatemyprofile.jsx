import React, { useState } from 'react';

function UpdateMyProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send UpdateMyProfile mutation request to your GraphQL server
            const response = await fetch('http://localhost:3001/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation UpdateMyProfile($id: ID!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
                            updateUser(
                                firstName: $firstName,
                                lastName: $lastName,
                                email: $email,
                                password: $password
                            ) {
                                firstName
                                lastName
                                email
                                password
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

            const { data, errors } = await response.json();

            if (errors) {
                console.error(errors);
                // Handle errors, such as displaying an error message to the user
                return;
            }

            // Handle successful response, such as redirecting the user or showing a success message
            alert('Profile updated successfully!');
            window.location.href = "http://localhost:3000/login";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Update My Profile</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateMyProfile;
