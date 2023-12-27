import { Youtube, Link } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from "react";

const youtubeSupabase = createClient('https://vlkwgaatcymduvwnuhmq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa3dnYWF0Y3ltZHV2d251aG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1MjM4NTksImV4cCI6MjAxOTA5OTg1OX0.aeZTX5vtgMDjWrlOvoCnuqVxPICryGxZlKX8-wkLdPs')


function YouTubeSection() {
  const [youtubeToken, setYoutubeToken] = useState("")

  useEffect(() => {
    const subscription = youtubeSupabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setYoutubeToken("")
        } else if (session) {
          setYoutubeToken(session?.provider_token  || "")
        }
      })

    return () => {
      subscription.data?.subscription.unsubscribe()
    }
  }, [])
  
  async function signInWithGoogle() {
    const { data, error } = await youtubeSupabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            scopes: "openid email profile https://www.googleapis.com/auth/youtube.readonly"
        }
    })
    console.log(data, error)
  }
  
  async function signOutWithGoogle() {
    const { error } = await youtubeSupabase.auth.signOut()
    console.log(error)
  }
  return (
    <>
        <div className="text-lg flex gap-2 items-center">
            YouTube
            <Youtube color="#CD201F" />
            <Button variant="outline" size="icon" onClick={() => signInWithGoogle()}><Link color="green" /></Button>
            <Button variant="outline" size="icon" onClick={() => console.log(youtubeToken)}><Link /></Button>
        </div>
    </>
  )
}

export default YouTubeSection