import './App.css'
import Header from './components/Header'
import StreamArea from './components/StreamArea'
import { OAuthProvider } from './context/oAuthProvider'
import { StreamProvider } from './context/streamContext'
import { useState } from 'react'

function App() {
  // oAuth Context
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

  // Stream Context
  const [stream1, updateStream1] = useState({
    streamId: "",
    platform: ""
  })
  const [stream2, updateStream2] = useState({
    streamId: "",
    platform: ""
  })
  const [stream3, updateStream3] = useState({
    streamId: "",
    platform: ""
  })
  const [stream4, updateStream4] = useState({
    streamId: "",
    platform: ""
  })
  const [streamScreen, updateStreamScreen] = useState("1")
  const setStream1 = (streamId: string, platform: string) => {
    updateStream1({streamId, platform})
  }
  const setStream2 = (streamId: string, platform: string) => {
    updateStream2({streamId, platform})
  }
  const setStream3 = (streamId: string, platform: string) => {
    updateStream3({streamId, platform})
  }
  const setStream4 = (streamId: string, platform: string) => {
    updateStream4({streamId, platform})
  }
  const setStreamScreen = (screen: string) => {
    updateStreamScreen(screen)
  }

  return (
    <>
      <OAuthProvider value={{twitchState, youtubeState, setTwitchState, setYoutubeState}}>
      <StreamProvider value={{stream1, stream2, stream3, stream4, streamScreen, setStream1, setStream2, setStream3, setStream4, setStreamScreen}}>
        <Header/>
        <div className="flex">
            <StreamArea/> 
        </div>
      </StreamProvider>
      </OAuthProvider>
    </>
  )
}

export default App
