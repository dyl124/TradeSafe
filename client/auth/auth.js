import * as jwt_decode from "jwt-decode";

// Environment variables
const TOKEN_KEY = "token"; // Assuming this is your token key
const SECRET = "topSecretToken"; // Assuming this is your secret

// Now you can access your environment variables like this:
const tokenKey = TOKEN_KEY;

// Functions for token management
export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY); // Assuming localStorage is available
  return token;
};

export const setToken = (token) => {
  // Save token to local storage
  localStorage.setItem(TOKEN_KEY, token); // Assuming localStorage is available
};

export const removeToken = () => {
  // Remove token from local storage
  localStorage.removeItem(TOKEN_KEY); // Assuming localStorage is available
};

// Function to check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwt_decode(token);
    const expired = decoded.exp < Date.now() / 1000;
    return expired;
  } catch (error) {
    // Token is invalid or expired
    return true;
  }
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  // Check if the user is authenticated (token exists and is not expired)
  const token = getToken();
  const authenticated = !!token && !isTokenExpired(token);
  return authenticated;
};

export { jwt_decode }; // Export jwt_decode for external usage if needed
