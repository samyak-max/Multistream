import { Twitch, Link } from 'lucide-react'; 
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStream } from '@/context/streamContext';
import { useTopStream } from '@/context/topStreamContext';

type TwitchSectionProps = {
  signInWithTwitch: () => void;
  signOutWithTwitch: () => void;
  twitchChannels: any[];
}

function TwitchSection({signInWithTwitch, signOutWithTwitch, twitchChannels}: TwitchSectionProps) {
  const { setStream1, setStream2, setStream3, setStream4, streamScreen } = useStream();
  const { twitchLoading } = useTopStream();

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
            Twitch
            <Twitch color="#9146ff" />
            <Button variant="outline" onClick={() => signInWithTwitch()} size="icon"><Link color="green" /></Button>
            <Button variant="outline" onClick={() => signOutWithTwitch()} size="icon"><Link /></Button>
            {/* <Button variant="outline" onClick={() => {console.log(twitchState);twitchAPIHandler(twitchState)}} size="icon"><Link /></Button> */}
        </div>
        <div>
          {twitchLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <ScrollArea className='h-80 w-55 rounded-md border px-2'>
                {twitchChannels.map((channel, index) => {
                  return (
                    <div key={index} className='flex justify-start gap-2 items-center my-3'>
                      <Button 
                        className='w-full flex justify-start gap-2 h-full items-center border-0 py-1' 
                        variant="outline"
                        onClick={() => updateStream(channel.login, "twitch")}
                      >
                      <Avatar>
                        <AvatarImage src={channel.profile_image_url} />
                        <AvatarFallback>X</AvatarFallback>
                      </Avatar>
                      <div className="text-base">{channel.display_name}</div>
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

export default TwitchSection