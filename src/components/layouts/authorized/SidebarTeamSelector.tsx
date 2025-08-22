import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Check, ChevronsUpDown, LucideIcon, MapPin, Plus } from "lucide-react";

interface SidebarTeamSelectorProps {
    teams: Team[];
    activeTeam: Team;
    onTeamSelect: (team: Team) => void;
    onAddNewTeam: () => void;
}

export interface Team {
    id: string;
    name: string;
    plan: string;
    role: string;
}

export function SidebarTeamSelector({ teams, activeTeam, onTeamSelect, onAddNewTeam }: SidebarTeamSelectorProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full justify-start h-12 rounded-xl transition-all duration-200 
                     text-gray-300 hover:text-white hover:bg-white/10"
                >
                    <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                    <div className="flex flex-col flex-1 truncate">
                        <span className="text-white font-medium truncate">
                            {activeTeam.name}
                        </span>
                        <span className="text-gray-400 text-xs truncate">
                            {activeTeam.plan}
                        </span>
                    </div>
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="bg-black/80 border border-white/10 backdrop-blur-sm rounded-lg 
                   w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 p-1 shadow-lg"
                align="start"
                side="right"
                sideOffset={4}
            >
                <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground">
                    Arenas
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border my-1" />
                {teams.map((team: any) => (
                    <DropdownMenuItem
                        key={team.id}
                        onClick={() => onTeamSelect(team)}
                        className={`flex items-center gap-2 p-2 cursor-pointer 
                       ${activeTeam.id === team.id ? "bg-white/10 text-white" : "text-gray-300"} 
                       hover:bg-white/10 focus:bg-white/10`}
                    >
                        <div className="flex-1 truncate">{team.name}</div>
                        {activeTeam.id === team.id && (
                            <Check className="ml-auto h-4 w-4 text-[#C4F000]" />
                        )}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-border my-1" />
                <DropdownMenuItem
                    onClick={onAddNewTeam}
                    className="flex items-center gap-2 p-2 cursor-pointer text-muted-foreground hover:bg-white/10 focus:bg-white/10"
                >
                    <div className="flex size-6 items-center justify-center rounded-md border border-white/10 bg-transparent">
                        <Plus className="size-4 text-muted-foreground" />
                    </div>
                    <div className="font-medium text-gray-300">Adicionar Arena</div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}