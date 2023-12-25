import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SquareStack, Search, Sun, Moon, Youtube, Twitch } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/context/theme-provider"
import { SelectGroup } from "@radix-ui/react-select";

function Header() {
    const { setTheme } = useTheme();
    const [selected, setSelected] = useState("youtube");
    const [search, setSearch] = useState("");
    return (
        <div className="flex justify-between items-center px-6 py-3">
            <SquareStack />
            <div className="flex gap-2">
            <Select defaultValue="youtube" onValueChange={(value) => setSelected(value)}>
            <SelectTrigger className="w-auto">
                <SelectValue placeholder="Platform"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="youtube" className="text-xl"><Youtube color="#CD201F"/></SelectItem>
                    <SelectItem value="twitch" className="text-xl"><Twitch color="#9146ff"/></SelectItem>
                </SelectGroup>
            </SelectContent>
            </Select>
                <Input type="text" placeholder="Search.." className="w-80" onChange={(e) => setSearch(e.target.value)}/>
                <Button type="submit" size="icon"><Search/></Button>
            </div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Theme</span> {/* screen reader only */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Header