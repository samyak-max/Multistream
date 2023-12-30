import StreamBox from "../StreamBox"
import { useStream } from '@/context/streamContext';
import { TwitchChat } from 'react-twitch-embed';

function DoubleView() {
  const { stream1, stream2 } = useStream();
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="grid">
        <div className="flex h-[60vh]">
          <StreamBox streamId={stream1.streamId} streamPlatform={stream1.platform} chat={false}/>
        </div>
        <div className="h-[40vh]">
          <TwitchChat channel={stream1.streamId} height="100%" width="100%"/>
        </div>
      </div>
      <div className="grid">
        <div className="flex h-[60vh]">
          <StreamBox streamId={stream2.streamId} streamPlatform={stream2.platform} chat={false}/>
        </div>
        <div className="h-[40vh]">
          <TwitchChat channel={stream2.streamId} height="100%" width="100%"/>
        </div>
      </div>
    </div>
  )
}

export default DoubleView