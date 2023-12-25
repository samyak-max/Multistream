import YouTubeSection from "./YouTubeSection"
import TwitchSection from "./TwitchSection"
import { Separator } from "@/components/ui/separator"

function LeftPanel() {
  return (
    <>
      <div className="flex flex-col px-3 py-2 w-full">
        <div className="py-3 flex justify-center">
          <YouTubeSection/>
        </div>
        <Separator/>  
        <div className="py-3 flex justify-center">
          <TwitchSection/>
        </div>    
      </div> 
    </>
  )
}

export default LeftPanel