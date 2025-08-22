"use client";

import React, { useState } from "react";
import {
    MapPin,
    Package,
    CreditCard,
    Calendar,
    ShoppingCart,
    Video,
    Users,
    BarChart3,
    Settings,
    Zap,
    LogOut,
    Home,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation"; // <- Next.js App Router
import { Button } from "@/components/ui/button";
import { SidebarTeamSelector, Team } from "./SidebarTeamSelector";
import { useSession } from "next-auth/react";

interface MenuItem {
    id: string;
    label: string;
    url: string;
    icon: any;
    color: string;
}

const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Home, color: "text-[#C4F000]", url: "/app" },
    { id: "arenas", label: "Arenas", icon: MapPin, color: "text-blue-400", url: "/app/arenas" },
    { id: "products", label: "Produtos", icon: Package, color: "text-purple-400", url: "/app/products" },
    { id: "payments", label: "Pagamentos", icon: CreditCard, color: "text-green-400", url: "/app/payments" },
    { id: "scheduling", label: "Agendamentos", icon: Calendar, color: "text-orange-400", url: "/app/scheduling" },
    { id: "pos", label: "PDV", icon: ShoppingCart, color: "text-pink-400", url: "/app/pos" },
    { id: "clips", label: "Clips", icon: Video, color: "text-cyan-400", url: "/app/clips" },
    { id: "users", label: "Usuários", icon: Users, color: "text-indigo-400", url: "/app/users" },
    { id: "reports", label: "Relatórios", icon: BarChart3, color: "text-yellow-400", url: "/app/reports" },
    { id: "settings", label: "Configurações", icon: Settings, color: "text-gray-400", url: "/app/settings" },
];

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const session = useSession();

    if (session.status !== "authenticated") {
        return null; // Render nothing if not authenticated
    }

    console.log(session.data);

    // Mock data for teams, replace with actual data fetching logic

    const mockTeams = [
        { id: '1', name: 'Arena Green', plan: 'Plano Premium', role: 'admin' },
        { id: '2', name: 'Quadra Amarela', plan: 'Plano Básico', role: 'member' },
        { id: '3', name: 'Clube Central', plan: 'Plano Premium', role: 'admin' },
    ];

    const [activeTeam, setActiveTeam] = useState<Team>(mockTeams[0]);
    const [currentMenuItems, setCurrentMenuItems] = useState<MenuItem[]>(menuItems);

    const handleTeamSelect = (team: Team) => {
        setActiveTeam(team);
        console.log(`Arena selecionada: ${team.name}, com a role: ${team.role}`);

        // Exemplo de como você poderia filtrar os itens do menu
        if (team.role === 'admin') {
            // Exibe todos os itens do menu
            setCurrentMenuItems(menuItems);
        } else {
            // Se a role for "member", esconde o item "Usuários" por exemplo
            const filteredItems = menuItems.filter((item: any) => item.id !== 'users');
            setCurrentMenuItems(filteredItems);
        }
    };
    const handleAddNewTeam = () => {
        console.log("Adicionando nova arena...");
    };

    return (
        <div className="w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 flex-shrink-0 flex flex-col h-screen">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#C4F000] to-cyan-400 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-black font-bold" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white">Arena.Fy</h2>
                        <p className="text-xs text-gray-400">admin panel</p>
                    </div>
                </div>
            </div>

            {/* Arena Selector */}
            <div className="p-6 border-b border-white/10">
                <SidebarTeamSelector
                    teams={mockTeams}
                    activeTeam={activeTeam}
                    onTeamSelect={handleTeamSelect}
                    onAddNewTeam={handleAddNewTeam}
                />
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
                {currentMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.url;

                    return (
                        <Button
                            key={item.id}
                            variant={isActive ? "default" : "ghost"}
                            className={`w-full justify-start h-12 rounded-xl transition-all duration-200 
                            ${isActive ? "bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black font-bold shadow-lg shadow-[#C4F000]/25"
                                    : "text-gray-300 hover:text-white hover:bg-white/10"
                                }`}
                            onClick={() => router.push(item.url)}
                        >
                            <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-black" : item.color}`} />
                            {item.label}
                        </Button>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
                <Button
                    variant="outline"
                    className="w-full justify-start h-12 border-2 border-red-500/50 text-red-400 hover:bg-red-900/20 bg-transparent rounded-xl"
                    onClick={() => console.log("Saindo...")}
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sair
                </Button>
            </div>
        </div>
    );
}
