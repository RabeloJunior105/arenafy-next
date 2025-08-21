import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { CrudConfig } from "./types";

interface DataTableProps {
    data: any[];
    config: CrudConfig;
    userRole: string;
    onEdit: (item: any) => void;
    onDelete: (id: number) => void;
}

export default function DataTable({ data, config, userRole, onEdit, onDelete }: DataTableProps) {
    return (
        <Card className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                            {config.columns.map((column) => (
                                <th key={column.name} className="text-left p-4 text-white font-bold">
                                    {column.label}
                                </th>
                            ))}
                            <th className="text-left p-4 text-white font-bold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                {config.columns.map((column) => (
                                    <td key={column.name} className="p-4">
                                        {column.render ? column.render(item) : item[column.name]}
                                    </td>
                                ))}
                                <td className="p-4">
                                    <div className="flex space-x-2">
                                        {config.actions.view && (
                                            <Link href={`/${config.entityName.toLowerCase()}/${item.id}`}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                                >
                                                    <Eye className="w-4 h-4" />
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}