import StreamBox from "../StreamBox"
import { useStream } from '@/context/streamContext';
import { Skeleton } from "@/components/ui/skeleton"
import { useTheme } from "@/context/themeProvider"  
import { TwitchChat } from 'react-twitch-embed';

function DoubleView() {
  const { theme } = useTheme();
  const { stream1, stream2 } = useStream();
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="grid">
        <div className="flex h-[60vh]">
          <StreamBox streamId={stream1.streamId} streamPlatform={stream1.platform} chat={false}/>
        </div>
        <div className="h-[40vh]">
          {stream1.streamId === "" &&
            <Skeleton className={`w-full h-full`}/>
          }
          {stream1.streamId !== "" &&
            <TwitchChat channel={stream1.streamId} height="100%" width="100%" darkMode={theme==='dark'}/>
          }
        </div>
      </div>
      <div className="grid">
        <div className="flex h-[60vh]">
          <StreamBox streamId={stream2.streamId} streamPlatform={stream2.platform} chat={false}/>
        </div>
        <div className="h-[40vh]">
          {stream2.streamId === "" &&
            <Skeleton className={`w-full h-full`}/>
          }
          {stream2.streamId !== "" &&
            <TwitchChat channel={stream1.streamId} height="100%" width="100%" darkMode={theme==='dark'}/>
          }
        </div>
      </div>
    </div>
  )
}

export default DoubleView