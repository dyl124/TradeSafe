import React from 'react';

function Logout() {
    // Handle logout logic here (e.g., clear localStorage, reset user state, etc.)
    const handleLogout = () => {
        // Example: Clear localStorage
        localStorage.removeItem('token');
        // Redirect to the login page or any other page after logout
        window.location.href = '/login';
    };

    return (
        <div>
            <h2>Logout</h2>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
