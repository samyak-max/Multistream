import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SingleView from "./SingleView"
import MultiView from "./MultiView"
import { useState } from "react"

function StreamArea() {
    const [activeTab, setActiveTab] = useState("single-view")
    return (
        <>
            <div className="flex w-full flex-col px-2 py-3 gap-2">
                <div className="flex">
                    <Tabs defaultValue="single-view" onValueChange={(value) => setActiveTab(value)}>
                        <TabsList>
                            <TabsTrigger value="single-view">Single View</TabsTrigger>
                            <TabsTrigger value="multi-view">Multi View</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div className="flex justify-center">
                    {activeTab === "single-view" && <SingleView />}
                    {activeTab === "multi-view" && <MultiView/>}
                </div>
            </div>
        </>
    )
}

export default StreamArea