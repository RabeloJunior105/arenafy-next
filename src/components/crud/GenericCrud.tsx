"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Filters from "./Filters";
import DataTable from "./DataTable";
import DataCards from "./DataCards";
import CrudModal from "./CrudModal";
import PaginationControls from "./PaginationControls";
import { CrudConfig } from "./types";
import { MapPin, Plus } from "lucide-react";

interface GenericCrudProps {
    config: CrudConfig;
    userRole: string;
}

export default function GenericCrud({ config, userRole }: GenericCrudProps) {
    const [viewMode, setViewMode] = useState<"cards" | "table">(
        config.viewModeOptions?.[0] || "cards"
    );
    const [data, setData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    // Carregar dados da API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseURL = 'http://localhost:3001'; // Fallback para desenvolvimento
                const queryParams = new URLSearchParams({
                    ...filters,
                    page: currentPage.toString(),
                    limit: itemsPerPage.toString(),
                    ...(searchTerm && { search: searchTerm }),
                });
                const response = await fetch(`${baseURL}${config.endpoint}?${queryParams}`);
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };
        fetchData();
    }, [config.endpoint, filters, currentPage, itemsPerPage, searchTerm]);

    // Filtrar dados localmente
    const filteredData = useMemo(() => {
        if (!config || !config.filters) {
            return data;
        }
        return data.filter((item) => {
            const matchesSearch = searchTerm
                ? config.filters
                    .filter((f) => f.type === "search")
                    .some((f) =>
                        Object.values(item).some(
                            (value) =>
                                typeof value === "string" &&
                                value.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    )
                : true;
            const matchesFilters = Object.entries(filters).every(([key, value]) =>
                value === "all" ? true : item[key] === value
            );
            return matchesSearch && matchesFilters;
        });
    }, [data, searchTerm, filters, config]);

    // Paginação
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handlers
    const handleFilterChange = (name: string, value: string) => {
        if (name === "search") {
            setSearchTerm(value);
        } else {
            setFilters((prev) => ({ ...prev, [name]: value }));
        }
        setCurrentPage(1);
    };

    const handleOpenModal = (item?: any) => {
        setEditingItem(item);
        setFormData(
            item
                ? Object.fromEntries(
                    config.fields.map((field) => [field.name, item[field.name]?.toString() || ""])
                )
                : Object.fromEntries(config.fields.map((field) => [field.name, ""]))
        );
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL_API || "http://localhost:3000/api";
            const payload = {
                ...formData,
                shouldAttachUserByDomain: formData.shouldAttachUserByDomain === "true",
            };
            if (editingItem) {
                // Atualizar
                await fetch(`${baseURL}${config.endpoint}/${editingItem.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                setData(data.map((item) => (item.id === editingItem.id ? { ...item, ...payload } : item)));
            } else {
                // Criar
                const response = await fetch(`${baseURL}${config.endpoint}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                const newItem = await response.json();
                setData([...data, newItem]);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL_API || "http://localhost:3000/api";
            await fetch(`${baseURL}${config.endpoint}/${id}`, { method: "DELETE" });
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar:", error);
        }
    };

    // Verificar se config é válido
    if (!config) {
        return (
            <div className="p-4 md:p-8">
                <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                    <CardContent className="p-12 text-center">
                        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">
                            Erro na configuração
                        </h3>
                        <p className="text-gray-400">
                            A configuração do componente não foi fornecida corretamente.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 space-y-6 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white flex items-center mb-2">
                        <MapPin className="w-8 h-8 md:w-10 md:h-10 text-[#C4F000] mr-3 md:mr-4" />
                        Gerenciar {config.entityName}s
                    </h1>
                    <p className="text-gray-400 text-sm md:text-lg">
                        Gerencie todas as {config.entityName.toLowerCase()}s da plataforma
                    </p>
                </div>
                {config.permissions.canEdit(userRole) && (
                    <Button
                        onClick={() => handleOpenModal()}
                        className="mt-4 md:mt-0 bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nova {config.entityName}
                    </Button>
                )}
            </div>

            {/* Filtros */}
            <Filters
                config={config}
                searchTerm={searchTerm}
                filters={filters}
                onFilterChange={handleFilterChange}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            {/* Conteúdo */}
            {paginatedData.length === 0 ? (
                <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                    <CardContent className="p-12 text-center">
                        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">
                            Nenhuma {config.entityName.toLowerCase()} encontrada
                        </h3>
                        <p className="text-gray-400">
                            Tente ajustar os filtros ou criar uma nova {config.entityName.toLowerCase()}.
                        </p>
                    </CardContent>
                </Card>
            ) : viewMode === "cards" ? (
                <DataCards
                    data={paginatedData}
                    config={config}
                    userRole={userRole}
                    onEdit={handleOpenModal}
                    onDelete={handleDelete}
                />
            ) : (
                <DataTable
                    data={paginatedData}
                    config={config}
                    userRole={userRole}
                    onEdit={handleOpenModal}
                    onDelete={handleDelete}
                />
            )}

            {/* Paginação */}
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                setItemsPerPage={setItemsPerPage}
                totalItems={filteredData.length}
                entityName={config.entityName}
            />

            {/* Modal */}
            <CrudModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                config={config}
                editingItem={editingItem}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
            />
        </div>
    );
}