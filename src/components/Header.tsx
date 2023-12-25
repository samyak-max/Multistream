import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { MoonStar, SquareStack, Search } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/context/theme-provider"

function Header() {
    const { setTheme } = useTheme();
    const [selected, setSelected] = useState("twitch");
    return (
        <div className="flex justify-between items-center p-6">
            <SquareStack />
            <div className="flex gap-2">
            <Select onValueChange={(value) => setSelected(value)}>
            <SelectTrigger className="w-25">
                <SelectValue placeholder="Platform"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="twitch">Twitch</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
            </Select>
                <Input type="text" placeholder="Search.." className="w-80"/>
                <Button type="submit" variant="outline"><Search /></Button>
            </div>
            <Toggle onClick={() => setTheme("dark")}><MoonStar /></Toggle>
        </div>
    )
}

export default Header