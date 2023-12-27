import { Client, Account } from "appwrite";


const client = new Client();

const account = new Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6589e5cda387fbbfd943') // Your project ID
;

export async function twitchLogin(){
    account.createOAuth2Session('twitch', 'https://localhost:5173', 'https://localhost:3000');
}
