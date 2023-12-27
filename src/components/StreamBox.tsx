import ReactPlayer from 'react-player';
import { TwitchChat } from 'react-twitch-embed';
import { useStream } from '@/context/streamContext';
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
    screenId: string,
    chat: boolean
}

function StreamBox({screenId, chat}: Props) {
    const { platform, streamId, viewScreen } = useStream();
    const twitchEndpoint = "https://www.twitch.tv/"+streamId;
    // console.log(twitchEndpoint);
    return (
        <div className={`h-full w-full min-h-[500px] shadow-2xl ${platform === "twitch" ? 'shadow-[0px_0px_30px_0px_rgba(145,70,255,1);]' : platform === "youtube" ? 'shadow-[0px_0px_30px_0px_rgba(205,32,31,1);]' : ' shadow-[0px_0px_30px_0px_rgba(170,255,0,1);]'}`}>
            {platform === "" &&
                <Skeleton className='w-full h-[500px]'/>
            }
            {platform === "twitch" && viewScreen === screenId &&
                <div className='grid grid-cols-4 h-full'>
                    <div className='col-span-3 relative'>
                        <ReactPlayer url={twitchEndpoint} width="100%" height="100%" controls={true} playing/>
                    </div>
                    <div className="">
                        <TwitchChat channel={streamId} height="100%" width="100%"/>
                    </div>
                </div>
            }
            {platform === "youtube" && viewScreen === screenId &&
                <></>
            }
        </div>
    )
}

export default StreamBox