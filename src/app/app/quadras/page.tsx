"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { MapPin, Plus, Users, Calendar, Camera, Edit, Trash2, DollarSign, TrendingUp } from "lucide-react"

export default function ArenaModule() {
    const [arenas, setArenas] = useState([
        {
            id: 1,
            name: "Arena Central",
            location: "Rua das Flores, 123 - Centro, SP",
            latitude: -23.5505,
            longitude: -46.6333,
            status: "active",
            revenue: "R$ 3.200",
            image: "/placeholder.svg?height=200&width=300",
            badge: "champion",

            // Data for queries future use
            courts: 4,
            cameras: 8,
            rating: 4.8,
            xp: 2850,
            maxXp: 3000,
            bookings: 28,
            level: 15,
            trend: "+12%",
        },
        {
            id: 2,
            name: "SportZone Elite",
            location: "Av. Paulista, 456 - Vila Madalena, SP",
            courts: 6,
            cameras: 12,
            rating: 4.9,
            status: "active",
            revenue: "R$ 2.800",
            bookings: 24,
            level: 12,
            xp: 1950,
            maxXp: 2500,
            image: "/placeholder.svg?height=200&width=300",
            badge: "pro",
            trend: "+8%",
        },
        {
            id: 3,
            name: "Urban Court",
            location: "Rua Augusta, 789 - Consolação, SP",
            courts: 3,
            cameras: 6,
            rating: 4.7,
            status: "maintenance",
            revenue: "R$ 2.100",
            bookings: 19,
            level: 10,
            xp: 1200,
            maxXp: 2000,
            image: "/placeholder.svg?height=200&width=300",
            badge: "rising",
            trend: "+5%",
        },
    ])

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            active: { label: "Ativa", gradient: "from-green-400 to-emerald-500" },
            maintenance: { label: "Manutenção", gradient: "from-yellow-400 to-orange-500" },
            inactive: { label: "Inativa", gradient: "from-red-400 to-pink-500" },
        }

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
        return <Badge className={`bg-gradient-to-r ${config.gradient} text-white font-bold`}>{config.label}</Badge>
    }

    const getBadgeIcon = (badge: string) => {
        const badges = {
            champion: "👑",
            pro: "⚡",
            rising: "🔥",
            rookie: "⭐",
        }
        return badges[badge as keyof typeof badges] || "⭐"
    }

    return (
        <div className="p-8 space-y-8 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white flex items-center mb-2">
                        <MapPin className="w-10 h-10 text-[#C4F000] mr-4" />
                        Gerenciar Arenas
                    </h1>
                    <p className="text-gray-400 text-lg">Gerencie suas arenas, quadras e configurações</p>
                </div>

                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold px-8 py-3 rounded-xl shadow-lg shadow-[#C4F000]/25 transition-all duration-300 hover:scale-105">
                            <Plus className="w-5 h-5 mr-2" />
                            Nova Arena
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900/95 border border-white/10 backdrop-blur-xl rounded-2xl max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-white text-xl font-bold">Adicionar Nova Arena</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="arena-name" className="text-white font-medium">
                                    Nome da Arena
                                </Label>
                                <Input
                                    id="arena-name"
                                    placeholder="Ex: Arena Central"
                                    className="bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000] focus:ring-[#C4F000]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="arena-location" className="text-white font-medium">
                                    Endereço
                                </Label>
                                <Textarea
                                    id="arena-location"
                                    placeholder="Endereço completo da arena"
                                    className="bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000] focus:ring-[#C4F000]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="courts" className="text-white font-medium">
                                        Nº Quadras
                                    </Label>
                                    <Input
                                        id="courts"
                                        type="number"
                                        placeholder="4"
                                        className="bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000] focus:ring-[#C4F000]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cameras" className="text-white font-medium">
                                        Nº Câmeras
                                    </Label>
                                    <Input
                                        id="cameras"
                                        type="number"
                                        placeholder="8"
                                        className="bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000] focus:ring-[#C4F000]"
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-2 border-white/20 text-white bg-transparent hover:bg-white/10 rounded-xl"
                                    onClick={() => setIsAddModalOpen(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    className="flex-1 bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold rounded-xl"
                                    onClick={() => setIsAddModalOpen(false)}
                                >
                                    Criar Arena
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-[#C4F000]/10 to-cyan-400/10 border border-[#C4F000]/20 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Total Arenas</p>
                                <p className="text-3xl font-black text-white">{arenas.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-[#C4F000] to-cyan-400 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-black" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-400/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Total Quadras</p>
                                <p className="text-3xl font-black text-white">{arenas.reduce((sum, arena) => sum + arena.courts, 0)}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-400/10 to-pink-500/10 border border-purple-400/20 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Câmeras Ativas</p>
                                <p className="text-3xl font-black text-white">
                                    {arenas.reduce((sum, arena) => sum + arena.cameras, 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-400/10 to-emerald-500/10 border border-green-400/20 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Receita Total</p>
                                <p className="text-3xl font-black text-white">R$ 8.1k</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Arenas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {arenas.map((arena) => (
                    <Card
                        key={arena.id}
                        className="bg-white/5 border border-white/10 hover:border-[#C4F000]/50 transition-all duration-300 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105 group"
                    >
                        <div className="relative">
                            <img src={arena.image || "/placeholder.svg"} alt={arena.name} className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            {/* Status Badge */}
                            <div className="absolute top-4 left-4">{getStatusBadge(arena.status)}</div>

                            {/* Arena Badge */}
                            <div className="absolute top-4 right-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-xl shadow-lg">
                                    {getBadgeIcon(arena.badge)}
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="absolute bottom-4 right-4">
                                <Badge className="bg-black/70 text-[#C4F000] font-bold backdrop-blur-sm">⭐ {arena.rating}</Badge>
                            </div>

                            {/* Level Badge */}
                            <div className="absolute bottom-4 left-4">
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                                    LVL {arena.level}
                                </Badge>
                            </div>
                        </div>

                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-black text-white mb-2">{arena.name}</h3>
                                    <p className="text-sm text-gray-400 flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {arena.location}
                                    </p>
                                </div>

                                {/* XP Progress */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">XP Progress</span>
                                        <span className="text-[#C4F000] font-bold">
                                            {arena.xp}/{arena.maxXp}
                                        </span>
                                    </div>
                                    <Progress value={(arena.xp / arena.maxXp) * 100} className="h-2 bg-gray-700" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center text-gray-300">
                                        <Users className="w-4 h-4 mr-2 text-[#C4F000]" />
                                        {arena.courts} quadras
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Camera className="w-4 h-4 mr-2 text-[#C4F000]" />
                                        {arena.cameras} câmeras
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Calendar className="w-4 h-4 mr-2 text-[#C4F000]" />
                                        {arena.bookings} agendamentos
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                                        {arena.trend}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-[#C4F000]">{arena.revenue}</p>
                                        <p className="text-xs text-gray-400">receita mensal</p>
                                    </div>
                                </div>

                                {/* {(user.role === "admin" || user.role === "arena_owner") && ( */}
                                <div className="flex space-x-3 pt-4 border-t border-white/10">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 border-2 border-white/20 text-white hover:bg-white/10 bg-transparent rounded-xl transition-all duration-300"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Editar
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-2 border-red-500/50 text-red-400 hover:bg-red-900/20 bg-transparent rounded-xl transition-all duration-300"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                {/* )} */}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
