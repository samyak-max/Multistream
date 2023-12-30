import { useStream } from '@/context/streamContext';
import StreamBox from "../StreamBox"

function QuadView() {
  const { stream1, stream2, stream3, stream4 } = useStream();

  return (
    <div className="flex flex-col gap-2 w-full"> 
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex h-[48vh]">
          <StreamBox streamId={stream1.streamId} streamPlatform={stream1.platform} chat={false}/>
        </div>
        <div className="flex h-[48vh]">
          <StreamBox streamId={stream2.streamId} streamPlatform={stream2.platform} chat={false}/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex h-[48vh]">
          <StreamBox streamId={stream3.streamId} streamPlatform={stream3.platform} chat={false}/>
        </div>
        <div className="flex h-[48vh]">
          <StreamBox streamId={stream4.streamId} streamPlatform={stream4.platform} chat={false}/>
        </div>
      </div>
    </div>
  )
}

export default QuadView