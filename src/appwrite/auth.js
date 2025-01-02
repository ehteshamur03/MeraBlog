import conf from '../conf/conf.js';
import { Client, Account, ID, OAuthProvider } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

        // Attach event listener to logout on browser/tab close
        window.addEventListener("beforeunload", () => this.logoutOnClose());
    }

    async createAccount({ email, password, name }) {
        try {
            console.log("Attempting to create account with:", { email, name });

            // Create the account with a unique ID
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("Account created successfully:", userAccount);

            // Now login with the created email and password
            const session = await this.login({ email, password });
            if (session) {
                console.log("Login successful, session created:", session);
                return session;
            }
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error", error);
        }
        return null;
    }

    async login({ email, password }) {
        try {
            console.log("Attempting to log in with email:", email);
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful:", session);
            return session;
        } catch (error) {
            console.error("Appwrite service :: login :: error", error);
            if (error?.message) {
                console.error("Error Message:", error.message);
            }
        }
        return null;
    }

    async getCurrentUser() {
        try {
            console.log("Fetching current user...");
            const currentUser = await this.account.get();
            console.log("Current user data:", currentUser);
            return currentUser;
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            console.log("Attempting to log out...");
            await this.account.deleteSessions(); // Deletes all sessions
            console.log("Logout successful.");
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }

    async logoutOnClose() {
        try {
            console.log("Attempting to log out on browser/tab close...");
            await this.account.deleteSession("current"); // Deletes only the current session
            console.log("Logout on close successful.");
        } catch (error) {
            console.error("Appwrite service :: logoutOnClose :: error", error);
        }
    }

    // Add GitHub OAuth login
    async loginWithGitHub() {
        try {
            // Generate the OAuth URL for GitHub login with correct URLs
            const url = await this.account.createOAuth2Session(
                OAuthProvider.Github,
                'https://ehteshamur03.github.io/MeraBlog/#/',
                'https://ehteshamur03.github.io/MeraBlog/#/login');

            if (url) {
                console.log("GitHub OAuth URL:", url);
                window.location.href = url;  // Redirect to GitHub login page
            } else {
                throw new Error("Failed to generate GitHub OAuth URL.");
            }
        } catch (error) {
            console.error("GitHub OAuth Error:", error);
            // throw error;
        }
    }

    async loginWithGoogle() {
        try {
            // Generate the OAuth URL for GitHub login with correct URLs
            const url = await this.account.createOAuth2Session(
                OAuthProvider.Google,
                'https://ehteshamur03.github.io/MeraBlog/#/',
                'https://ehteshamur03.github.io/MeraBlog/#/login');

            if (url) {
                console.log("Google OAuth URL:", url);
                window.location.href = url;  // Redirect to GitHub login page
            } else {
                throw new Error("Failed to generate Google OAuth URL.");
            }
        } catch (error) {
            console.error("Google OAuth Error:", error);
            // throw error;
        }
    }

}


const authService = new AuthService();

export default authService;