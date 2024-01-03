import axios, { AxiosResponse } from 'axios';

const youtube_live_endpoint = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=5&q";
const livestream_endpoint = "https://www.googleapis.com/youtube/v3/search?eventType=live&type=video";


let youtubeTopStreams: object[] = [];

export default async function youtubeTopStreamsAPIHandler(
    req: any
    ) {
    console.log("Youtube Top Streams API Handler");
    const token = req.youtubeToken;
    try{
        const channels = await axios.get(youtube_live_endpoint, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        await Promise.all(
            channels.data.items.map(async (i: any) => {
                await ( axios.get(livestream_endpoint + "&channelId=" + i.snippet.channelId, {
                    headers : {
                        'Authorization': "Bearer " + token
                    }
                })
                .then((response: AxiosResponse) => {
                    let ytData;
                    ytData = {
                        channel_id: i.snippet.channelId,
                        channel_name: i.snippet.channelTitle,
                        channel_thumbnail: i.snippet.thumbnails.medium.url,
                        video_id: response.data.items.length===0 ? "" : response.data.items[0].id.videoId,
                        channel_platform: "youtube",
                        is_live: true
                    }
                    youtubeTopStreams.push(ytData);
                })
                )
            })
        )
        return youtubeTopStreams;
    }
    catch (error){
        console.log("Youtube Token invalid or API query limit reached", error);
    }
}