import StreamBox from "./StreamBox"

function DoubleView() {
  return (
    <div className="flex gap-8">
      <div className="flex w-[600px]">
        <StreamBox screenId="1" chat={true}/>
      </div>
      <div className="flex w-[600px]">
        <StreamBox screenId="2" chat={true}/>
      </div>
    </div>
  )
}

export default DoubleView