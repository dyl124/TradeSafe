import * as jwt_decode from "jwt-decode";

// Environment variables
const TOKEN_KEY = "token"; // Assuming this is your token key
const SECRET = "topSecretToken"; // Assuming this is your secret

// Now you can access your environment variables like this:
const tokenKey = TOKEN_KEY;

// Functions for token management
export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY); // Assuming localStorage is available
  console.log("Token retrieved from local storage:", token);
  return token;
};

export const setToken = (token) => {
  // Save token to local storage
  console.log("Setting token in local storage:", token);
  localStorage.setItem(TOKEN_KEY, token); // Assuming localStorage is available
};

export const removeToken = () => {
  // Remove token from local storage
  console.log("Removing token from local storage");
  localStorage.removeItem(TOKEN_KEY); // Assuming localStorage is available
};

// Function to check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwt_decode(token);
    console.log("Decoded token:", decoded);
    console.log("Token expiration:", new Date(decoded.exp * 1000));
    console.log("Current time:", new Date());
    const expired = decoded.exp < Date.now() / 1000;
    console.log("Token expired:", expired);
    return expired;
  } catch (error) {
    // Token is invalid or expired
    console.error("Error decoding token:", error);
    return true;
  }
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  // Check if the user is authenticated (token exists and is not expired)
  const token = getToken();
  const authenticated = !!token && !isTokenExpired(token);
  console.log("User authenticated:", authenticated);
  return authenticated;
};

export { jwt_decode }; // Export jwt_decode for external usage if needed
