import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SingleView from "./ScreenViews/SingleView"
import DoubleView from "./ScreenViews/DoubleView"
import TripleView from "./ScreenViews/TripleView"
import QuadView from "./ScreenViews/QuadView"
import { useState } from "react"
import { useStream } from '@/context/streamContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"

function StreamArea() {
    const [activeTab, setActiveTab] = useState("single-view")
    const { setStreamScreen } = useStream();

    return (
        <>
            <div className="flex w-full flex-col px-10 py-3 gap-2">
                <div className="flex gap-3">
                    <Tabs defaultValue="single-view" onValueChange={(value) => setActiveTab(value)}>
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
            </div>
        </>
    )
}

export default StreamArea