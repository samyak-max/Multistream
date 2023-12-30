import { useStream } from '@/context/streamContext';
import StreamBox from "../StreamBox"


function TripleView() {
  const { stream1, stream2, stream3 } = useStream();
  return (
    <div className='flex gap-3 flex-col w-full'>
      <div className="flex w-full h-[55vh]">
        <StreamBox streamId={stream1.streamId} streamPlatform={stream1.platform} chat={true}/>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex h-[40vh]">
          <StreamBox streamId={stream2.streamId} streamPlatform={stream2.platform} chat={false}/>
        </div>
        <div className="flex h-[40vh]">
          <StreamBox streamId={stream3.streamId} streamPlatform={stream3.platform} chat={false}/>
        </div>
      </div>
    </div>
  )
}

export default TripleView