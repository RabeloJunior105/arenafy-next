import { Search, Filter, Award, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CrudConfig } from "./types";

interface FiltersProps {
    config: CrudConfig;
    searchTerm: string;
    filters: { [key: string]: string };
    onFilterChange: (name: string, value: string) => void;
    viewMode: "cards" | "table";
    setViewMode: (mode: "cards" | "table") => void;
}

export default function Filters({ config, searchTerm, filters, onFilterChange, viewMode, setViewMode }: FiltersProps) {
    return (
        <Card className="bg-white/5 border border-white/10 rounded-xl">
            <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    {config.filters.map((filter) => (
                        <div key={filter.name} className="relative flex-1 max-w-md">
                            {filter.type === "search" ? (
                                <>
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder={filter.label}
                                        value={searchTerm}
                                        onChange={(e) => onFilterChange(filter.name, e.target.value)}
                                        className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
                                    />
                                </>
                            ) : (
                                <Select
                                    value={filters[filter.name] || "all"}
                                    onValueChange={(value) => onFilterChange(filter.name, value)}
                                >
                                    <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                                        {filter.name === "status" ? <Filter className="w-4 h-4 mr-2" /> : <Award className="w-4 h-4 mr-2" />}
                                        <SelectValue placeholder={filter.label} />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-white/10">
                                        {filter.options?.map((option) => (
                                            <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    ))}
                    {config.viewModeOptions && (
                        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                            {config.viewModeOptions.includes("cards") && (
                                <Button
                                    variant={viewMode === "cards" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("cards")}
                                    className={
                                        viewMode === "cards"
                                            ? "bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black"
                                            : "text-white hover:bg-white/10"
                                    }
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </Button>
                            )}
                            {config.viewModeOptions.includes("table") && (
                                <Button
                                    variant={viewMode === "table" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("table")}
                                    className={
                                        viewMode === "table"
                                            ? "bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black"
                                            : "text-white hover:bg-white/10"
                                    }
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}