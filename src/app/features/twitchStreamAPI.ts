import axios, { AxiosResponse } from 'axios';

const validateURL = "https://id.twitch.tv/oauth2/validate";
const followed_endpoint = "https://api.twitch.tv/helix/channels/followed?user_id=";
const channel_endpoint = "https://api.twitch.tv/helix/users";
const top_streams_endpoint = "https://api.twitch.tv/helix/streams?type=live&first=15";

type TwitchType = {
    twitchChannels: object[],
    twitchTopStreams: object[]
}

export default async function twitchAPIHandler(
    req: any
    ) {
    let twitch: TwitchType = {
        twitchChannels: [],
        twitchTopStreams: []
    };
    const token = req.twitchToken;
    try {
        const response = await axios.get(validateURL, {
            headers: {
                'Authorization': "Bearer " + token
            }
        });
        const clientId = response.data.client_id;
        try{
            const followedResponse = await axios.get(followed_endpoint + req.twitchUserId, {
                headers: {
                    'Authorization': "Bearer " + token,
                    'Client-Id': clientId
                }
            });
            let channelIds: string = "";
            followedResponse.data.data.map((value: any, index: number) => {
                if (index === 0) {
                    channelIds = channelIds + "?login=" + value.broadcaster_login;
                }
                else {
                    channelIds = channelIds + "&login=" + value.broadcaster_login;
                }
            });
            await axios.get(channel_endpoint + channelIds, {
                headers: {
                    'Authorization': "Bearer " + token,
                    'Client-Id': clientId
                }
            })
            .then((response: AxiosResponse) => {
            twitch.twitchChannels = response.data.data;
            });
        }
        catch (error) {
            console.log("Client Id invalid", error);
        }
        try {
            await axios.get(top_streams_endpoint, {
                headers: {
                    'Authorization': "Bearer " + token,
                    'Client-Id': response.data.client_id
                }
            })
            .then((response: AxiosResponse) => {
                twitch.twitchTopStreams = response.data.data;
            });
        }
        catch (error) {
            console.log("Client Id invalid", error);
        }
    } catch (error) {
        console.log("Session token invalid", error);
    }
    return twitch;
}