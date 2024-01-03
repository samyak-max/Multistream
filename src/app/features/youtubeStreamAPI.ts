import axios, { AxiosResponse } from 'axios';

const subscription_endpoint = "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=5";
const channel_endpoint = "https://www.googleapis.com/youtube/v3/search?eventType=live&type=video";

let youtubeChannels: object[] = [];

export default async function youtubeAPIHandler(
    req: any
    ) {
    console.log("Youtube API Handler");
    const token = req.youtubeToken;
    try {
        const response = await axios.get(subscription_endpoint, {
            headers: {
                'Authorization': "Bearer " + token
            }
        });
        await Promise.all(
            response.data.items.map(async (i: any) => {
                await (axios.get(channel_endpoint + "&channelId=" + i.snippet.resourceId.channelId, {
                    headers: {
                        'Authorization': "Bearer " + token,
                    }
                }))
                .then((response: AxiosResponse) => {
                    let ytData
                    if(response.data.items.length===0){
                        ytData = {
                            channel_id: i.snippet.resourceId.channelId,
                            channel_name: i.snippet.title,
                            channel_thumbnail: i.snippet.thumbnails.medium.url,
                            video_id: "",
                            channel_platform: "youtube",
                            is_live: false
                        }
                    }
                    else{
                        ytData = {
                            channel_id: i.snippet.resourceId.channelId,
                            channel_name: i.snippet.title,
                            channel_thumbnail: i.snippet.thumbnails.medium.url,
                            video_id: response.data.items[0].id.videoId,
                            channel_platform: "youtube",
                            is_live: true
                        }
                    }
                    youtubeChannels.push(ytData);
                })
            })
        )
    }
    catch (error) {
        console.log("Youtube Token invalid or API query limit reached", error);
    }
    return youtubeChannels;
    }
