import { Youtube, Link } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStream } from '@/context/streamContext';
import { useTopStream } from '@/context/topStreamContext';

type YouTubeSectionProps = {
  signInWithGoogle: () => void;
  signOutWithGoogle: () => void;
  youtubeChannels: any[];
}

function YouTubeSection({signInWithGoogle, signOutWithGoogle, youtubeChannels}: YouTubeSectionProps) {
  const { setStream1, setStream2, setStream3, setStream4, streamScreen } = useStream();
  const { youtubeLoading } = useTopStream();

  const updateStream = (streamId: string, platform: string) => {
    if (streamScreen === "1") {
      setStream1(streamId, platform);
    } else if (streamScreen === "2") {
      setStream2(streamId, platform);
    } else if (streamScreen === "3") {
      setStream3(streamId, platform);
    } else if (streamScreen === "4") {
      setStream4(streamId, platform);
    }
  }

  return (
    <>
      <div className="flex gap-2 flex-col">
        <div className="text-lg flex gap-2 items-center">
            YouTube
            <Youtube color="#CD201F" />
            <Button variant="outline" size="icon" onClick={() => signInWithGoogle()}><Link color="green" /></Button>
            <Button variant="outline" size="icon" onClick={() => signOutWithGoogle()}><Link /></Button>
        </div>
        <div>
          {youtubeLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <ScrollArea className='w-55 h-64 rounded-md border px-2'>
                {youtubeChannels.map((channel, index) => {
                  return (
                    <div key={index} className='flex justify-start gap-2 items-center my-3'>
                      <Button 
                        className='w-full flex justify-start gap-2 h-full items-center border-0 py-1' 
                        variant="outline"
                        onClick={() => updateStream(channel.video_id, "youtube")}
                      >
                      <Avatar>
                        <AvatarImage src={channel.channel_thumbnail} />
                        <AvatarFallback>X</AvatarFallback>
                      </Avatar>
                      <div className="text-base">{channel.channel_name}</div>
                      </Button>
                    </div>
                  )
                })}
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default YouTubeSection