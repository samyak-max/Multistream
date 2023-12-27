import { Twitch, Link } from 'lucide-react'; 
import { Button } from "@/components/ui/button";
import { createClient } from '@supabase/supabase-js'
import { useEffect } from "react";
import { useOAuth } from "@/context/oAuthProvider";
import twitchAPIHandler from "../app/features/twitchAPI";

const twitchSupabase = createClient('https://vlkwgaatcymduvwnuhmq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa3dnYWF0Y3ltZHV2d251aG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1MjM4NTksImV4cCI6MjAxOTA5OTg1OX0.aeZTX5vtgMDjWrlOvoCnuqVxPICryGxZlKX8-wkLdPs')

function TwitchSection() {
  const { twitchState, setTwitchState } = useOAuth();

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
    console.log(error)
  }
  
  return (
    <>
        <div className="text-lg flex gap-2 items-center">
            Twitch
            <Twitch color="#9146ff" />
            <Button variant="outline" onClick={() => signInWithTwitch()} size="icon"><Link color="green" /></Button>
            <Button variant="outline" onClick={() => signOutWithTwitch()} size="icon"><Link color="green" /></Button>
            <Button variant="outline" onClick={() => {console.log(twitchState);twitchAPIHandler(twitchState);}} size="icon"><Link /></Button>
        </div>
    </>
  )
}

export default TwitchSection