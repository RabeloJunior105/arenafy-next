"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowLeft,
    MapPin,
    Star,
    Users,
    Calendar,
    DollarSign,
    Camera,
    TrendingUp,
    Activity,
    Clock,
    Award,
    Zap,
    Target,
    BarChart3,
    PieChart,
    LineChart,
    Settings,
    Edit,
    Share2,
    Trash2,
} from "lucide-react"

interface Arena {
    id: number
    name: string
    location: string
    city: string
    courts: number
    rating: number
    status: "ativa" | "inativa" | "manutencao"
    category: "premium" | "standard" | "basica"
    monthlyRevenue: number
    totalBookings: number
    image: string
    createdAt: string
    cameras: number
    level: number
    xp: number
    maxXp: number
    description?: string
    phone?: string
    email?: string
    website?: string
    openingHours?: string
    amenities?: string[]
}

interface ArenaStats {
    dailyBookings: { date: string; bookings: number }[]
    monthlyRevenue: { month: string; revenue: number }[]
    courtUsage: { court: string; usage: number }[]
    peakHours: { hour: string; bookings: number }[]
    customerSatisfaction: number
    averageSessionDuration: number
    totalClips: number
    totalPlayers: number
}

export default function ArenaDetailPage() {
    const params = useParams()
    const router = useRouter()
    const arenaId = Number.parseInt(params.id as string)

    const [arena, setArena] = useState<Arena | null>(null)
    const [stats, setStats] = useState<ArenaStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simular carregamento de dados
        const loadArenaData = async () => {
            setLoading(true)

            // Dados mock da arena
            const arenaData: Arena = {
                id: arenaId,
                name: "Arena Central",
                location: "Rua das Flores, 123 - Centro",
                city: "São Paulo",
                courts: 4,
                rating: 4.8,
                status: "ativa",
                category: "premium",
                monthlyRevenue: 25000,
                totalBookings: 156,
                image: "/placeholder.svg?height=400&width=600",
                createdAt: "2024-01-15",
                cameras: 8,
                level: 15,
                xp: 2850,
                maxXp: 3000,
                description:
                    "Arena moderna com infraestrutura completa para esportes. Localizada no centro da cidade, oferece a melhor experiência para jogadores de todos os níveis.",
                phone: "(11) 99999-9999",
                email: "contato@arenacentral.com",
                website: "www.arenacentral.com",
                openingHours: "Segunda a Domingo: 06:00 - 23:00",
                amenities: ["Vestiários", "Estacionamento", "Lanchonete", "Wi-Fi", "Ar Condicionado", "Som Ambiente"],
            }

            // Dados mock de estatísticas
            const statsData: ArenaStats = {
                dailyBookings: [
                    { date: "2024-01-01", bookings: 12 },
                    { date: "2024-01-02", bookings: 15 },
                    { date: "2024-01-03", bookings: 18 },
                    { date: "2024-01-04", bookings: 14 },
                    { date: "2024-01-05", bookings: 20 },
                    { date: "2024-01-06", bookings: 22 },
                    { date: "2024-01-07", bookings: 19 },
                ],
                monthlyRevenue: [
                    { month: "Jan", revenue: 22000 },
                    { month: "Fev", revenue: 25000 },
                    { month: "Mar", revenue: 28000 },
                    { month: "Abr", revenue: 24000 },
                    { month: "Mai", revenue: 30000 },
                    { month: "Jun", revenue: 32000 },
                ],
                courtUsage: [
                    { court: "Quadra 1", usage: 85 },
                    { court: "Quadra 2", usage: 92 },
                    { court: "Quadra 3", usage: 78 },
                    { court: "Quadra 4", usage: 88 },
                ],
                peakHours: [
                    { hour: "06:00", bookings: 2 },
                    { hour: "08:00", bookings: 5 },
                    { hour: "10:00", bookings: 8 },
                    { hour: "12:00", bookings: 12 },
                    { hour: "14:00", bookings: 15 },
                    { hour: "16:00", bookings: 18 },
                    { hour: "18:00", bookings: 22 },
                    { hour: "20:00", bookings: 25 },
                    { hour: "22:00", bookings: 15 },
                ],
                customerSatisfaction: 4.8,
                averageSessionDuration: 90,
                totalClips: 1247,
                totalPlayers: 892,
            }

            // Simular delay de carregamento
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setArena(arenaData)
            setStats(statsData)
            setLoading(false)
        }

        loadArenaData()
    }, [arenaId])

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            ativa: { label: "Ativa", gradient: "from-green-400 to-emerald-500" },
            inativa: { label: "Inativa", gradient: "from-red-400 to-red-600" },
            manutencao: { label: "Manutenção", gradient: "from-yellow-400 to-orange-500" },
        }
        const config = statusConfig[status as keyof typeof statusConfig]
        return <Badge className={`bg-gradient-to-r ${config.gradient} text-white font-bold`}>{config.label}</Badge>
    }

    const getCategoryBadge = (category: string) => {
        const categoryConfig = {
            premium: { label: "Premium", gradient: "from-purple-400 to-pink-500" },
            standard: { label: "Standard", gradient: "from-blue-400 to-cyan-500" },
            basica: { label: "Básica", gradient: "from-gray-400 to-gray-600" },
        }
        const config = categoryConfig[category as keyof typeof categoryConfig]
        return <Badge className={`bg-gradient-to-r ${config.gradient} text-white font-bold`}>{config.label}</Badge>
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#C4F000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Carregando dados da arena...</p>
                </div>
            </div>
        )
    }

    if (!arena || !stats) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Arena não encontrada</h1>
                    <Button onClick={() => router.back()} className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black">
                        Voltar
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.back()}
                                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Voltar
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-white">{arena.name}</h1>
                                <p className="text-gray-400 flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {arena.city}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                                <Share2 className="w-4 h-4 mr-2" />
                                Compartilhar
                            </Button>
                            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                            </Button>
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold"
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Configurações
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Imagem Principal */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                            <div className="relative">
                                <img
                                    src={arena.image || "/placeholder.svg"}
                                    alt={arena.name}
                                    className="w-full h-64 md:h-80 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex space-x-2">
                                    {getStatusBadge(arena.status)}
                                    {getCategoryBadge(arena.category)}
                                </div>

                                {/* Level Badge */}
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg px-4 py-2">
                                        LVL {arena.level}
                                    </Badge>
                                </div>

                                {/* Rating */}
                                <div className="absolute bottom-4 right-4">
                                    <div className="bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center space-x-2">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="text-white font-bold text-lg">{arena.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Informações Rápidas */}
                    <div className="space-y-6">
                        {/* XP Progress */}
                        <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white">Progresso XP</h3>
                                    <Badge className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black font-bold">
                                        +{Math.floor(Math.random() * 50 + 10)} hoje
                                    </Badge>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">XP Atual</span>
                                        <span className="text-[#C4F000] font-bold">
                                            {arena.xp}/{arena.maxXp}
                                        </span>
                                    </div>
                                    <Progress value={(arena.xp / arena.maxXp) * 100} className="h-3" />
                                    <div className="text-center">
                                        <span className="text-xs text-gray-400">{arena.maxXp - arena.xp} XP para o próximo nível</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats Rápidas */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="bg-gradient-to-br from-[#C4F000]/10 to-cyan-400/10 border border-[#C4F000]/20 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-4 text-center">
                                    <Users className="w-8 h-8 text-[#C4F000] mx-auto mb-2" />
                                    <div className="text-2xl font-black text-white">{arena.courts}</div>
                                    <div className="text-xs text-gray-400">Quadras</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-blue-400/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-4 text-center">
                                    <Camera className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                    <div className="text-2xl font-black text-white">{arena.cameras}</div>
                                    <div className="text-xs text-gray-400">Câmeras</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-400/10 to-emerald-500/10 border border-green-400/20 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-4 text-center">
                                    <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                    <div className="text-2xl font-black text-white">{(arena.monthlyRevenue / 1000).toFixed(0)}k</div>
                                    <div className="text-xs text-gray-400">Receita/mês</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-400/10 to-pink-500/10 border border-purple-400/20 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-4 text-center">
                                    <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                    <div className="text-2xl font-black text-white">{arena.totalBookings}</div>
                                    <div className="text-xs text-gray-400">Reservas</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Tabs de Conteúdo */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="bg-white/5 border border-white/10 rounded-xl p-1">
                        <TabsTrigger
                            value="overview"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C4F000] data-[state=active]:to-cyan-400 data-[state=active]:text-black text-white"
                        >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Visão Geral
                        </TabsTrigger>
                        <TabsTrigger
                            value="analytics"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C4F000] data-[state=active]:to-cyan-400 data-[state=active]:text-black text-white"
                        >
                            <LineChart className="w-4 h-4 mr-2" />
                            Analytics
                        </TabsTrigger>
                        <TabsTrigger
                            value="details"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C4F000] data-[state=active]:to-cyan-400 data-[state=active]:text-black text-white"
                        >
                            <MapPin className="w-4 h-4 mr-2" />
                            Detalhes
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C4F000] data-[state=active]:to-cyan-400 data-[state=active]:text-black text-white"
                        >
                            <Settings className="w-4 h-4 mr-2" />
                            Configurações
                        </TabsTrigger>
                    </TabsList>

                    {/* Visão Geral */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Métricas Principais */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="bg-gradient-to-br from-green-400/10 to-emerald-500/10 border border-green-400/20 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Receita Mensal</p>
                                            <p className="text-3xl font-black text-white">R$ {(arena.monthlyRevenue / 1000).toFixed(0)}k</p>
                                            <div className="flex items-center text-green-400 text-sm mt-1">
                                                <TrendingUp className="w-4 h-4 mr-1" />
                                                +12% vs mês anterior
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                            <DollarSign className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-blue-400/10 to-cyan-500/10 border border-blue-400/20 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Reservas Totais</p>
                                            <p className="text-3xl font-black text-white">{arena.totalBookings}</p>
                                            <div className="flex items-center text-blue-400 text-sm mt-1">
                                                <TrendingUp className="w-4 h-4 mr-1" />
                                                +8% vs mês anterior
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-400/10 to-pink-500/10 border border-purple-400/20 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Satisfação</p>
                                            <p className="text-3xl font-black text-white">{stats.customerSatisfaction}</p>
                                            <div className="flex items-center text-purple-400 text-sm mt-1">
                                                <Star className="w-4 h-4 mr-1" />
                                                Excelente
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-orange-400/10 to-red-500/10 border border-orange-400/20 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Clips Criados</p>
                                            <p className="text-3xl font-black text-white">{stats.totalClips}</p>
                                            <div className="flex items-center text-orange-400 text-sm mt-1">
                                                <Zap className="w-4 h-4 mr-1" />
                                                +15% vs mês anterior
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                                            <Activity className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Gráficos */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Uso das Quadras */}
                            <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        <PieChart className="w-5 h-5 mr-2 text-[#C4F000]" />
                                        Uso das Quadras
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {stats.courtUsage.map((court, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300">{court.court}</span>
                                                <span className="text-[#C4F000] font-bold">{court.usage}%</span>
                                            </div>
                                            <Progress value={court.usage} className="h-2" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Horários de Pico */}
                            <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        <Clock className="w-5 h-5 mr-2 text-[#C4F000]" />
                                        Horários de Pico
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {stats.peakHours.slice(0, 6).map((hour, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-gray-300 text-sm">{hour.hour}</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-20 bg-gray-700 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-[#C4F000] to-cyan-400 h-2 rounded-full"
                                                        style={{ width: `${(hour.bookings / 25) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-[#C4F000] font-bold text-sm w-8">{hour.bookings}</span>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Analytics */}
                    <TabsContent value="analytics" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Receita Mensal */}
                            <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        <LineChart className="w-5 h-5 mr-2 text-[#C4F000]" />
                                        Receita Mensal (6 meses)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {stats.monthlyRevenue.map((month, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300">{month.month}</span>
                                                <span className="text-green-400 font-bold">R$ {(month.revenue / 1000).toFixed(0)}k</span>
                                            </div>
                                            <Progress value={(month.revenue / 35000) * 100} className="h-2" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Reservas Diárias */}
                            <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        <BarChart3 className="w-5 h-5 mr-2 text-[#C4F000]" />
                                        Reservas Diárias (7 dias)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {stats.dailyBookings.map((day, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300">
                                                    {new Date(day.date).toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit" })}
                                                </span>
                                                <span className="text-blue-400 font-bold">{day.bookings}</span>
                                            </div>
                                            <Progress value={(day.bookings / 25) * 100} className="h-2" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Métricas Avançadas */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-6 text-center">
                                    <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                                    <div className="text-3xl font-black text-white mb-2">{stats.averageSessionDuration}min</div>
                                    <div className="text-sm text-gray-400">Duração Média da Sessão</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-pink-400/10 to-purple-500/10 border border-pink-400/20 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-6 text-center">
                                    <Users className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                                    <div className="text-3xl font-black text-white mb-2">{stats.totalPlayers}</div>
                                    <div className="text-sm text-gray-400">Jogadores Únicos</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-6 text-center">
                                    <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                                    <div className="text-3xl font-black text-white mb-2">87%</div>
                                    <div className="text-sm text-gray-400">Taxa de Ocupação</div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Detalhes */}
                    <TabsContent value="details" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Informações Básicas */}
                            <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        <MapPin className="w-5 h-5 mr-2 text-[#C4F000]" />
                                        Informações da Arena
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">Descrição</h4>
                                        <p className="text-gray-300 text-sm leading-relaxed">{arena.description}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-white font-semibold mb-2">Contato</h4>
                                            <div className="space-y-2 text-sm">
                                                <p className="text-gray-300">📞 {arena.phone}</p>
                                                <p className="text-gray-300">✉️ {arena.email}</p>
                                                <p className="text-gray-300">🌐 {arena.website}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-white font-semibold mb-2">Funcionamento</h4>
                                            <p className="text-gray-300 text-sm">{arena.openingHours}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-semibold mb-2">Endereço Completo</h4>
                                        <p className="text-gray-300 text-sm">
                                            {arena.location}, {arena.city}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Comodidades */}
                            <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        <Award className="w-5 h-5 mr-2 text-[#C4F000]" />
                                        Comodidades
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-3">
                                        {arena.amenities?.map((amenity, index) => (
                                            <div key={index} className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg">
                                                <div className="w-2 h-2 bg-[#C4F000] rounded-full"></div>
                                                <span className="text-gray-300 text-sm">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Infraestrutura */}
                        <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center">
                                    <Camera className="w-5 h-5 mr-2 text-[#C4F000]" />
                                    Infraestrutura Técnica
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-[#C4F000] to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <Users className="w-8 h-8 text-black" />
                                        </div>
                                        <div className="text-2xl font-bold text-white">{arena.courts}</div>
                                        <div className="text-sm text-gray-400">Quadras Disponíveis</div>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <Camera className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-white">{arena.cameras}</div>
                                        <div className="text-sm text-gray-400">Câmeras 4K</div>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <Activity className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-white">100%</div>
                                        <div className="text-sm text-gray-400">Uptime</div>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <Zap className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-white">24/7</div>
                                        <div className="text-sm text-gray-400">Monitoramento</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Configurações */}
                    <TabsContent value="settings" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Configurações Gerais */}
                            <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        <Settings className="w-5 h-5 mr-2 text-[#C4F000]" />
                                        Configurações Gerais
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button className="w-full bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Editar Informações Básicas
                                    </Button>

                                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                                        <Camera className="w-4 h-4 mr-2" />
                                        Configurar Câmeras
                                    </Button>

                                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Gerenciar Horários
                                    </Button>

                                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                                        <DollarSign className="w-4 h-4 mr-2" />
                                        Configurar Preços
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Ações Avançadas */}
                            <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        <Award className="w-5 h-5 mr-2 text-[#C4F000]" />
                                        Ações Avançadas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                                        <BarChart3 className="w-4 h-4 mr-2" />
                                        Exportar Relatórios
                                    </Button>

                                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Compartilhar Arena
                                    </Button>

                                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                                        <Activity className="w-4 h-4 mr-2" />
                                        Backup de Dados
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Desativar Arena
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
