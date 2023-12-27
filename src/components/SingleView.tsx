import StreamBox from "./StreamBox"

function SingleView() {
  return (
    <div className="flex w-[900px]">
      <StreamBox screenId="1" chat={true}/>
    </div>
  )
}

export default SingleView