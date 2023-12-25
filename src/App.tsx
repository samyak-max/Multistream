import './App.css'
import Header from './components/Header'
import { Separator } from "@/components/ui/separator"
import LeftPanel from './components/LeftPanel'
import StreamArea from './components/StreamArea'

function App() {
  return (
    <>
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
    </>
  )
}

export default App
