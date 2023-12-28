import ReactPlayer from 'react-player';
import { TwitchChat } from 'react-twitch-embed';
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
    streamId: string,
    streamPlatform: string,
    chat: boolean
}

function StreamBox({streamId, streamPlatform ,chat}: Props) {
    const twitchEndpoint = "https://www.twitch.tv/"+streamId;
    // console.log(twitchEndpoint);
    return (
        <div className={`h-full w-full min-h-[500px] shadow-2xl ${streamPlatform === "twitch" ? 'shadow-[0px_0px_30px_0px_rgba(145,70,255,1);]' : streamPlatform === "youtube" ? 'shadow-[0px_0px_30px_0px_rgba(205,32,31,1);]' : ' shadow-[0px_0px_30px_0px_rgba(170,255,0,1);]'}`}>
            {streamPlatform === "" &&
                <Skeleton className='w-full h-[500px]'/>
            }
            {streamPlatform === "twitch" && (
                <div className='grid grid-cols-4 h-full'>
                    <div className={`relative ${chat===true ? "col-span-3" : "col-span-4"}`}>
                        <ReactPlayer url={twitchEndpoint} width="100%" height="100%" controls={true} playing/>
                    </div>
                    {chat && (
                    <div className="col-span-1">
                        <TwitchChat channel={streamId} height="100%" width="100%"/>
                    </div>
                    )}
                </div>
            )}
            {streamPlatform === "youtube" &&
                <></>
            }
        </div>
    )
}

export default StreamBox