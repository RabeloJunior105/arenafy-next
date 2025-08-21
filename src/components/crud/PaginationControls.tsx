import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    setCurrentPage: (page: number) => void;
    setItemsPerPage: (items: number) => void;
    totalItems: number;
    entityName: string;
}

export default function PaginationControls({
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    totalItems,
    entityName,
}: PaginationControlsProps) {
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...");
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Mostrar</span>
                <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                        setItemsPerPage(Number(value));
                        setCurrentPage(1);
                    }}
                >
                    <SelectTrigger className="w-20 bg-white/5 border-white/10 text-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/10">
                        <SelectItem value="6" className="text-white hover:bg-white/10">
                            6
                        </SelectItem>
                        <SelectItem value="9" className="text-white hover:bg-white/10">
                            9
                        </SelectItem>
                        <SelectItem value="12" className="text-white hover:bg-white/10">
                            12
                        </SelectItem>
                        <SelectItem value="24" className="text-white hover:bg-white/10">
                            24
                        </SelectItem>
                    </SelectContent>
                </Select>
                <span className="text-sm text-gray-400">por página</span>
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-50"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                {getVisiblePages().map((page, index) => (
                    <Button
                        key={index}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => typeof page === "number" && setCurrentPage(page)}
                        disabled={page === "..."}
                        className={
                            page === currentPage
                                ? "bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black font-bold"
                                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                        }
                    >
                        {page}
                    </Button>
                ))}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-50"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
            <div className="text-sm text-gray-400">
                Página {currentPage} de {totalPages} • {totalItems} {entityName.toLowerCase()}s
            </div>
        </div>
    );
}