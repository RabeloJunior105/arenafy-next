import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Badge } from "lucide-react";
import Link from "next/link";
import { CrudConfig } from "./types";
import { usePathname } from "next/navigation";

interface DataCardsProps {
    data: any[];
    config: CrudConfig;
    userRole: string;
    onEdit: (item: any) => void;
    onDelete: (id: number) => void;
}

export default function DataCards({ data, config, userRole, onEdit, onDelete }: DataCardsProps) {

    const pathname = usePathname();


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
                <Card
                    key={item.id}
                    className="bg-white/5 border border-white/10 hover:border-[#C4F000]/50 transition-all duration-300 group rounded-2xl overflow-hidden hover:scale-105"
                >
                    {item.image && (
                        <div className="relative">
                            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            {config.badges?.status && (
                                <div className="absolute top-3 left-3">
                                    <Badge className={`bg-gradient-to-r ${config.badges.status[item.status].gradient} text-white font-bold`}>
                                        {config.badges.status[item.status].label}
                                    </Badge>
                                </div>
                            )}
                            {config.badges?.category && (
                                <div className="absolute top-3 right-3">
                                    <Badge
                                        className={`bg-gradient-to-r ${config.badges.category[item.category].gradient} text-white font-bold`}
                                    >
                                        {config.badges.category[item.category].label}
                                    </Badge>
                                </div>
                            )}
                            <div className="absolute bottom-3 right-3">
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                                    LVL {item.level}
                                </Badge>
                            </div>
                            <Link href={`${pathname}/${item.id}`}>
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
                                    <div className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black px-4 py-2 rounded-xl font-bold flex items-center space-x-2 shadow-lg">
                                        <Eye className="w-4 h-4" />
                                        <span>Ver Detalhes</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}
                    <CardContent className="p-6">
                        {config.columns.map((column) =>
                            column.render ? (
                                <div key={column.name}>{column.render(item)}</div>
                            ) : (
                                <div key={column.name} className="text-white">{item[column.name]}</div>
                            )
                        )}
                        <div className="flex space-x-2 pt-4 border-t border-white/10">
                            {config.actions.view && (
                                <Link href={`/${config.entityName.toLowerCase()}/${item.id}`} className="flex-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Ver
                                    </Button>
                                </Link>
                            )}
                            {config.actions.edit && config.permissions.canEdit(userRole) && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(item)}
                                    className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                            )}
                            {config.actions.delete && config.permissions.canDelete(userRole) && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onDelete(item.id)}
                                    className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}