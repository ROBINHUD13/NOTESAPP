
import { Client, Account, Databases, Avatars } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject("67b9769f0033365ffa52"); // Replace with your Appwrite Project ID

// Initialize Appwrite account
export const account = new Account(client);

// Initialize Appwrite databases (if you need them)

export const avatars = new Avatars(client);
export const databases = new Databases(client);

// Google OAuth login function
export const loginWithGoogle = async () => {
    try {
        // The URL to redirect back to after authentication (your app URL)
        const redirectUrl = window.location.origin;
        
        // Initiate the Google OAuth2 login
        account.createOAuth2Session('google', redirectUrl, redirectUrl);
    } catch (error) {
        console.error('Error logging in with Google:', error);
        throw error;
    }
};

// Get the current user's session
export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

// Logout function
export const logout = async () => {
    try {
        return await account.deleteSession('current');
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};
