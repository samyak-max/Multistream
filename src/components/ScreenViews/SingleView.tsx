import StreamBox from "../StreamBox"
import { useStream } from '@/context/streamContext';

function SingleView() {
  const { stream1 } = useStream();
  return (
    <div className="flex w-full min-h-[90vh]">
      <StreamBox streamId={stream1.streamId} streamPlatform={stream1.platform} chat={true}/>
    </div>
  )
}

export default SingleView