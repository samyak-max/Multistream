import './App.css'
import Header from './components/Header'
import { Separator } from "@/components/ui/separator"
import LeftPanel from './components/LeftPanel'
import StreamArea from './components/StreamArea'
import { OAuthProvider } from './context/oAuthProvider'
import { StreamProvider } from './context/streamContext'
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
  const [platform, updatePlatform] = useState("");
  const [streamId, updateStreamId] = useState("");
  const [viewScreen, updateViewScreen] = useState("1");
  const setTwitchState = (newState: any) => {
    updateTwitchState(newState)
  }
  const setYoutubeState = (newState: any) => {
    updateYoutubeState(newState)
  }
  const setPlatform = (newPlatform: string) => {
    updatePlatform(newPlatform)
  }
  const setStreamId = (newStreamId: string) => {
    updateStreamId(newStreamId)
  }
  const setViewScreen = (newViewScreen: string) => {
    updateViewScreen(newViewScreen)
  }
  return (
    <>
      <OAuthProvider value={{twitchState, youtubeState, setTwitchState, setYoutubeState}}>
      <StreamProvider value={{platform, streamId, viewScreen, setPlatform, setStreamId, setViewScreen}}>
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
      </StreamProvider>
      </OAuthProvider>
    </>
  )
}

export default App
