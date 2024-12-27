import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
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
            await this.account.deleteSessions();
            console.log("Logout successful.");
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;
