"use client"

import { useState, useMemo } from "react"
import {
    LayoutDashboard,
    MapPin,
    ChevronRight,
    Zap,
    LogOut,
    Package,
} from "lucide-react"
import {
    Sidebar as UISidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface MenuItem {
    id: string
    title: string
    url: string
    icon: LucideIcon
    color: string
    items?: { title: string; url: string }[]
}

const menuItems: MenuItem[] = [
    {
        id: "dashboard",
        title: "Dashboard",
        url: "",
        icon: LayoutDashboard,
        color: "text-[#C4F000]",
    },
    {
        id: "arenas",
        title: "Arenas",
        url: "arenas",
        icon: MapPin,
        color: "text-cyan-400",
    },
    {
        id: "quadras",
        title: "Quadras",
        url: "quadras",
        icon: MapPin,
        color: "text-cyan-400",
    },
    {
        id: "products",
        title: "Produtos",
        url: "products",
        icon: Package,
        color: "text-green-400",
        items: [
            { title: "Listar Produtos", url: "products" },
            { title: "Adicionar Produto", url: "products/add" },
            { title: "Categorias", url: "products/categories" },
            { title: "Adicionar Categoria", url: "products/categories/add" },
        ]
    },
    /*     {
            id: "scheduling",
            title: "Agendamentos",
            url: "scheduling",
            icon: Calendar,
            color: "text-purple-400",
        },
        {
            id: "clips",
            title: "Clips",
            url: "clips",
            icon: Video,
            color: "text-pink-400",
        },
        {
            id: "cameras",
            title: "Câmeras",
            url: "cameras",
            icon: Camera,
            color: "text-orange-400",
        },
        {
            id: "products",
            title: "Produtos",
            url: "products",
            icon: Package,
            color: "text-green-400",
        },
        {
            id: "payments",
            title: "Pagamentos",
            url: "payments",
            icon: CreditCard,
            color: "text-blue-400",
        },
        {
            id: "analytics",
            title: "Relatórios",
            url: "analytics",
            icon: BarChart3,
            color: "text-indigo-400",
        },
        {
            id: "pos",
            title: "PDV",
            url: "pos",
            icon: ShoppingCart,
            color: "text-yellow-400",
        },
        {
            id: "settings",
            title: "Configurações",
            url: "settings",
            icon: Settings,
            color: "text-gray-400",
        }, */
]

export function AppSidebar() {
    const [activeModule, setActiveModule] = useState("dashboard")

    const updatedMenuItems = useMemo(() => {
        return menuItems.map((item) => {
            return item
        })
    }, [])

    return (
        <UISidebar collapsible="icon" className="bg-black/20 backdrop-blur-xl border-r border-white/10">
            <SidebarContent>
                {/* Header */}
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" className="gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-[#C4F000] to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-[#C4F000]/25">
                                    <Zap className="w-6 h-6 text-black font-bold" />
                                </div>
                                <div className="grid text-left text-sm leading-tight">
                                    <span className="text-xl font-black bg-gradient-to-r from-[#C4F000] to-cyan-400 bg-clip-text text-transparent">
                                        Arena.Fy
                                    </span>
                                    <span className="text-xs text-gray-400">LEVEL UP YOUR GAME</span>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                {/* Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel>Navegação</SidebarGroupLabel>
                    <SidebarMenu>
                        {updatedMenuItems.map((item) =>
                            item.items && item.items.length > 0 ? (
                                <Collapsible
                                    key={item.id}
                                    asChild
                                    defaultOpen={activeModule === item.id}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                className={`${activeModule === item.id
                                                    ? "bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black"
                                                    : "text-gray-400 hover:text-white hover:bg-white/10"
                                                    } rounded - xl`}
                                            >
                                                <item.icon className={`w - 5 h - 5 ${item.color} `} />
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link
                                                                href={`/app/${subItem.url}`}
                                                                onClick={() => setActiveModule(item.id)}
                                                            >
                                                                <span>{subItem.title}</span>
                                                            </Link >
                                                        </SidebarMenuSubButton >
                                                    </SidebarMenuSubItem >
                                                ))}
                                            </SidebarMenuSub >
                                        </CollapsibleContent >
                                    </SidebarMenuItem >
                                </Collapsible >
                            ) : (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        className={`${activeModule === item.id
                                            ? "bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black"
                                            : "text-gray-400 hover:text-white hover:bg-white/10"
                                            } rounded-xl`}
                                    >
                                        <Link
                                            href={`/app/${item.url}`}
                                            onClick={() => setActiveModule(item.id)}
                                        >
                                            <item.icon className={`w-5 h-5 ${item.color}`} />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        )}
                    </SidebarMenu >
                </SidebarGroup >

                {/* Logout */}
                <SidebarGroup className="mt-auto" >
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl"
                            >
                                <Link href="/logout">
                                    <LogOut className="w-5 h-5" />
                                    <span>Sair</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </UISidebar>
    )
}