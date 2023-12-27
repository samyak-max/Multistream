import './App.css'
import Header from './components/Header'
import { Separator } from "@/components/ui/separator"
import LeftPanel from './components/LeftPanel'
import StreamArea from './components/StreamArea'
import { OAuthProvider } from '../src/context/oAuthProvider'
import { useState } from 'react'

function App() {
  const [twitchState, updateTwitchState] = useState({
    twitchToken: "",
    twitchUserId: ""
  })
  const [youtubeState, updateYoutubeState] = useState({
    youtubeToken: "",
    youtubeUserId: ""
  })
  const setTwitchState = (newState: any) => {
    updateTwitchState(newState)
  }
  const setYoutubeState = (newState: any) => {
    updateYoutubeState(newState)
  }
  return (
    <>
      <OAuthProvider value={{twitchState, youtubeState, setTwitchState, setYoutubeState}}>
      <Header/>
      <div className="flex">
        <div className='flex w-1/6'>
          <LeftPanel/>
        </div>
        <Separator orientation="vertical"/>
        <div className='flex w-5/6'>
          <StreamArea/>
        </div>
      </div>
      </OAuthProvider>
    </>
  )
}

export default App
