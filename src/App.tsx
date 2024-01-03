import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import StreamArea from './components/StreamArea'
import { OAuthProvider } from './context/oAuthProvider'
import { StreamProvider } from './context/streamContext'
import { TopStreamProvider } from './context/topStreamContext'
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

  // Stream Screen Context
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

  //Stream Context
  const [topTwitchStreams, updateTopTwitchStreams] = useState<object[]>([]);
  const [topYoutubeStreams, updateTopYoutubeStreams] = useState<object[]>([]);
  const [twitchLoading, updateTwitchLoading] = useState(true);
  const [youtubeLoading, updateYoutubeLoading] = useState(true);
  const setTopTwitchStreams = (streams: object[]) => {
    updateTopTwitchStreams(streams)
  }
  const setTopYoutubeStreams = (streams: object[]) => {
    updateTopYoutubeStreams(streams)
  }
  const setTwitchLoading = (loading: boolean) => {
    updateTwitchLoading(loading)
  }
  const setYoutubeLoading = (loading: boolean) => {
    updateYoutubeLoading(loading)
  }

  return (
    <>
      <OAuthProvider value={{twitchState, youtubeState, setTwitchState, setYoutubeState}}>
      <StreamProvider value={{stream1, stream2, stream3, stream4, streamScreen, setStream1, setStream2, setStream3, setStream4, setStreamScreen}}>
      <TopStreamProvider value={{topTwitchStreams, topYoutubeStreams, twitchLoading, youtubeLoading, setTopTwitchStreams, setTopYoutubeStreams, setTwitchLoading, setYoutubeLoading}}>
        <Header/>
        <div className="flex">
            <StreamArea/> 
        </div>
        <Footer/>
      </TopStreamProvider>
      </StreamProvider>
      </OAuthProvider>
    </>
  )
}

export default App
