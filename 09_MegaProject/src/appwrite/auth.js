import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();   // default
    account;  

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURl)
            .setProject(conf.appwriteProjectID);

        this.account = new Account(this.client);
    }

    async createAccount( {email, password, name} ){
        try {
            const userAccount = await this.account.create(
                ID.unique(), email, password, name
            );

            // checking
            if (userAccount) {
                // call another method -> login
                return this.login({email, password});
            }
            else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login( {email, password} ){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code === 401) {
                // Handle unauthorized access
                console.log('Unauthorized access. Redirecting to login or displaying an error...');
            } else {
                console.log('appwrite service :: getCurrentUser', error);
            }
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();  // object 
export default authService;

// 
// creating class to export to other services