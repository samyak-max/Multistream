import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://vlkwgaatcymduvwnuhmq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa3dnYWF0Y3ltZHV2d251aG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1MjM4NTksImV4cCI6MjAxOTA5OTg1OX0.aeZTX5vtgMDjWrlOvoCnuqVxPICryGxZlKX8-wkLdPs')

export async function signInWithYoutube() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    console.log(data, error)
}

export async function signOutWithYoutube() {
    const { error } = await supabase.auth.signOut()
    console.log(error)
}