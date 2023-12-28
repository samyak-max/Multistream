import StreamBox from "./StreamBox"
import { useStream } from '@/context/streamContext';

function DoubleView() {
  const { stream1, stream2 } = useStream();
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="flex">
        <StreamBox streamId={stream1.streamId} streamPlatform={stream1.platform} chat={false}/>
      </div>
      <div className="flex">
        <StreamBox streamId={stream2.streamId} streamPlatform={stream2.platform} chat={false}/>
      </div>
    </div>
  )
}

export default DoubleView