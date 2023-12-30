import { Twitch, Link } from 'lucide-react'; 
import { Button } from "@/components/ui/button";
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from "react";
import { useOAuth } from "@/context/oAuthProvider";
import twitchAPIHandler from "../app/features/twitchStreamAPI";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStream } from '@/context/streamContext';

const anon_key = import.meta.env.VITE_SUPABASE_ANON_KEY
const twitchSupabase = createClient('https://vlkwgaatcymduvwnuhmq.supabase.co', anon_key || '')

function TwitchSection() {
  const { twitchState, setTwitchState } = useOAuth();
  const { setStream1, setStream2, setStream3, setStream4, streamScreen } = useStream();
  const [loading, setLoading] = useState(true);
  const [twitchChannels, setTwitchChannels] = useState<any[]>([]);

  useEffect(() => {
    const subscription = twitchSupabase.auth.onAuthStateChange(
      (event, session) => {
        // console.log(event, session)
        if (event === 'SIGNED_OUT') {
          setTwitchState({ twitchToken: "", twitchUserId: "" })
        } else if (session) {
          setTwitchState({ twitchToken: session.provider_token, twitchUserId: session.user.identities?.[0]?.id ?? '' })
        }
      })

    return () => {
      subscription.data?.subscription.unsubscribe()
    }
  }, [])
  

  useEffect(() => {
    if (twitchState.twitchToken && twitchState.twitchUserId && !twitchChannels?.length) {
      twitchAPIHandler(twitchState)
        .then((res) => {
          setTwitchChannels(res);
          setLoading(false);
        });
    }
  }, [twitchState.twitchToken, twitchState.twitchUserId])

  async function signInWithTwitch() {
    const { data, error } = await twitchSupabase.auth.signInWithOAuth({
      provider: 'twitch',
      options: {
        scopes: "openid user:read:email user:read:follows"
      }
    })
    console.log(data, error)
  }
  async function signOutWithTwitch() {
    const { error } = await twitchSupabase.auth.signOut()
    console.log("Signed Out!", error);
  }

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
          {loading ? (
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
                          <AvatarFallback>U</AvatarFallback>
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