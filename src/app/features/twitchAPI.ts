import axios, { AxiosResponse } from 'axios';

const validateURL = "https://id.twitch.tv/oauth2/validate";
const followed_endpoint = "https://api.twitch.tv/helix/channels/followed?user_id=";
const channel_endpoint = "https://api.twitch.tv/helix/users";

export default function twitchAPIHandler(
    req: any
    ) {
    const token = req.twitchToken;
    const response = axios.get(validateURL, {
        headers: {
            'Authorization': "Bearer " + token
        }
    })
    .then((response: AxiosResponse) => {
        const clientId = response.data.client_id;
        axios.get(followed_endpoint + req.twitchUserId, {
            headers: {
                'Authorization': "Bearer " + token,
                'Client-Id': clientId
            }
        })
        .then((response) => {
            let channelIds: string = "";
            response.data.data.map((value:any, index:number) => {
                if(index === 0) {
                    channelIds = channelIds + "?login=" + value.broadcaster_login;
                }
                else {
                    channelIds = channelIds + "&login=" + value.broadcaster_login;
                }
            })
            console.log(channelIds);
            axios.get(channel_endpoint + channelIds, {
                headers: {
                    'Authorization': "Bearer " + token,
                    'Client-Id': clientId
                }
            })
            .then((response: any) => {
                console.log("Subscription data", response.data.data);
            })
        })
    })
    return response;
}