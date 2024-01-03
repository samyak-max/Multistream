import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SingleView from "./ScreenViews/SingleView"
import DoubleView from "./ScreenViews/DoubleView"
import TripleView from "./ScreenViews/TripleView"
import QuadView from "./ScreenViews/QuadView"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useStream } from '@/context/streamContext';
import { useTopStream } from '@/context/topStreamContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"

function StreamArea() {
    const [activeTab, setActiveTab] = useState("single-view");
    const { setStreamScreen, setStream1, setStream2, setStream3, setStream4, streamScreen } = useStream();
    const { topTwitchStreams, twitchLoading, youtubeLoading, topYoutubeStreams } = useTopStream();

    const updateStream = (streamId: string, platform: string) => {
        if (streamScreen === "1") {
            setStream1(streamId, platform);
        } else if (streamScreen === "2") {
            setStream2(streamId, platform);
        } else if (streamScreen === "3") {
            setStream3(streamId, platform);
        } else if (streamScreen === "4") {
            setStream4(streamId, platform);
        }
    }   

    return (
        <>
            <div className="flex w-full flex-col px-10 py-3 gap-2">
                <div className="flex gap-3">
                    <Tabs defaultValue="single-view" onValueChange={(value) => {setActiveTab(value);}}>
                        <TabsList>
                            <TabsTrigger value="single-view">Single View</TabsTrigger>
                            <TabsTrigger value="double-view">Double View</TabsTrigger>
                            <TabsTrigger value="triple-view">Triple View</TabsTrigger>
                            <TabsTrigger value="quad-view">Quad View</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Select defaultValue="1" onValueChange={(value) => setStreamScreen(value)}>
                    <SelectTrigger className="w-auto">
                        <SelectValue placeholder="View"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1" className="text-sm">1</SelectItem>
                            {(activeTab === "double-view" || activeTab === "triple-view" || activeTab === "quad-view") && <SelectItem value="2" className="text-sm">2</SelectItem>}
                            {(activeTab === "triple-view" || activeTab === "quad-view") && <SelectItem value="3" className="text-sm">3</SelectItem>}
                            {activeTab === "quad-view" && <SelectItem value="4" className="text-sm">4</SelectItem>}
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-center mt-6">
                    {activeTab === "single-view" && <SingleView />}
                    {activeTab === "double-view" && <DoubleView/>}
                    {activeTab === "triple-view" && <TripleView/>}
                    {activeTab === "quad-view" && <QuadView/>}
                </div>
                <div className="flex mt-6 flex-col">
                    <div className="flex text-3xl font-bold">
                        Top Twitch Streams
                    </div>
                    {twitchLoading ? <div>Loading...</div> :
                    
                        <div className="flex gap-2 mt-4 shadow-[0px_0px_30px_0px_rgba(145,70,255,1);] rounded-md ">
                            <ScrollArea className="w-screen whitespace-nowrap rounded-md border h-80 p-3">
                            <div className="flex w-full space-x-4">
                            {topTwitchStreams.map((stream: any, index: number) => {
                                return (
                            
                                    <div key={index} className='flex flex-col h-[220px] w-[440px]'>
                                        <Button
                                            className="h-[228px] w-[440px] p-0"
                                            variant="outline"
                                            onClick={() => updateStream(stream.user_login, "twitch")}
                                        >
                                            <img src={stream.thumbnail_url?.replace(/{width}/g, "440").replace(/{height}/g, "220")}/>
                                        </Button>
                                        <div>
                                            <div className="flex text-lg">{stream.title.length > 30 ? `${stream.title.substring(0, 40)}...` : stream.title}</div>
                                            <div className="flex text-base text-zinc-500">{stream.user_name}</div>
                                            <div className="flex text-sm  text-gray-500">{stream.game_name}</div>
                                        </div>
                                        
                                    </div>
                                )
                            })}
                        </div>
                        <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>}
                </div>

                <div className="flex mt-6 flex-col">
                    <div className="flex text-3xl font-bold">
                        Top YouTube Streams
                    </div>
                    {youtubeLoading ? <div>Loading...</div> :
                    
                        <div className="flex gap-2 mt-4 shadow-[0px_0px_30px_0px_rgba(205,32,31,1);] rounded-md ">
                            <ScrollArea className="w-screen whitespace-nowrap rounded-md border h-80 p-3">
                            <div className="flex w-full space-x-4">
                            {topYoutubeStreams.map((stream: any, index: number) => {
                                return (
                            
                                    <div key={index} className='flex flex-col h-[220px] w-[440px]'>
                                        <Button
                                            className="h-[228px] w-[440px] p-0"
                                            variant="outline"
                                            onClick={() => updateStream(stream.video_id, "youtube")}
                                        >
                                            <img src={stream.channel_thumbnail}/>
                                        </Button>
                                        <div>
                                            <div className="flex text-lg">{stream.channel_name.length > 30 ? `${stream.channel_name.substring(0, 40)}...` : stream.channel_name}</div>
                                            <div className="flex text-base text-zinc-500">{stream.channel_name}</div>
                                        </div>
                                        
                                    </div>
                                )
                            })}
                        </div>
                        <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default StreamArea