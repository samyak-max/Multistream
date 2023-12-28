import { useStream } from '@/context/streamContext';
import StreamBox from "./StreamBox"


function TripleView() {
  const { stream1, stream2, stream3 } = useStream();
  return (
    <div className='flex gap-3 flex-col'>
      <div className="flex">
        <StreamBox streamId={stream1.streamId} streamPlatform={stream1.platform} chat={true}/>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex">
          <StreamBox streamId={stream2.streamId} streamPlatform={stream2.platform} chat={false}/>
        </div>
        <div className="flex">
          <StreamBox streamId={stream3.streamId} streamPlatform={stream3.platform} chat={false}/>
        </div>
      </div>
    </div>
  )
}

export default TripleView