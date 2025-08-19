"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    BarChart3,
    Calendar,
    DollarSign,
    MapPin,
    Video,
    Clock,
    Trophy,
    Zap,
    TrendingUp,
    Target,
    Award,
} from "lucide-react"

interface DashboardProps {
    user: {
        role: string
        name: string
        level: number
        xp: number
        maxXp: number
        stats: {
            clipsCreated: number
            totalViews: number
            totalLikes: number
        }
    }
}

export function Dashboard() {
    const stats = [
        {
            title: "Arenas Ativas",
            value: "12",
            change: "+2 esta semana",
            icon: MapPin,
            gradient: "from-[F000] to-cyan-400",
            bgGradient: "from-[#C4F000]/10 to-cyan-400/10",
        },
        {
            title: "Agendamentos Hoje",
            value: "48",
            change: "+12% vs ontem",
            icon: Calendar,
            gradient: "from-blue-400 to-purple-500",
            bgGradient: "from-blue-400/10 to-purple-500/10",
        },
        {
            title: "Clips Criados",
            value: "234",
            change: "+18 hoje",
            icon: Video,
            gradient: "from-purple-400 to-pink-500",
            bgGradient: "from-purple-400/10 to-pink-500/10",
        },
        {
            title: "Receita Mensal",
            value: "R$ 15.2k",
            change: "+8.2% vs mês anterior",
            icon: DollarSign,
            gradient: "from-green-400 to-emerald-500",
            bgGradient: "from-green-400/10 to-emerald-500/10",
        },
    ]

    const recentActivity = [
        {
            id: 1,
            type: "booking",
            message: "Nova reserva na Arena Central - Quadra 2",
            time: "2 min atrás",
            icon: Calendar,
            color: "text-blue-400",
            bgColor: "bg-blue-400/20",
        },
        {
            id: 2,
            type: "clip",
            message: "Clip épico criado por João Silva",
            time: "5 min atrás",
            icon: Video,
            color: "text-purple-400",
            bgColor: "bg-purple-400/20",
        },
        {
            id: 3,
            type: "payment",
            message: "Pagamento recebido - R$ 120,00",
            time: "10 min atrás",
            icon: DollarSign,
            color: "text-green-400",
            bgColor: "bg-green-400/20",
        },
        {
            id: 4,
            type: "achievement",
            message: "Nova conquista desbloqueada: 'Scorer Master'",
            time: "15 min atrás",
            icon: Trophy,
            color: "text-yellow-400",
            bgColor: "bg-yellow-400/20",
        },
    ]

    const topArenas = [
        {
            name: "Arena Central",
            bookings: 28,
            revenue: "R$ 3.2k",
            rating: 4.8,
            trend: "+12%",
            level: 15,
        },
        {
            name: "SportZone Elite",
            bookings: 24,
            revenue: "R$ 2.8k",
            rating: 4.9,
            trend: "+8%",
            level: 12,
        },
        {
            name: "Urban Court",
            bookings: 19,
            revenue: "R$ 2.1k",
            rating: 4.7,
            trend: "+5%",
            level: 10,
        },
    ]

    const dailyMissions = [
        {
            title: "Criar 3 clips",
            progress: 2,
            total: 3,
            xp: 150,
            completed: false,
        },
        {
            title: "Fazer 5 agendamentos",
            progress: 5,
            total: 5,
            xp: 200,
            completed: true,
        },
        {
            title: "Receber 10 likes",
            progress: 7,
            total: 10,
            xp: 100,
            completed: false,
        },
    ]

    return (
        <div className="p-8 space-y-8 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white mb-2">
                        Olá, Junior <span className="ml-3 text-2xl">👋</span> 
                    </h1>
                    <p className="text-gray-400 text-lg">Aqui está o resumo das suas atividades hoje</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <div className="text-sm text-gray-400">Próximo Level</div>
                        {/* <div className="text-lg font-bold text-[#C4F000]">{user.maxXp - user.xp} XP restantes</div> */}
                    </div>
                    <Badge className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black font-bold px-4 py-2 text-sm">
                        <Zap className="w-4 h-4 mr-2" />
                        Level {/* {user.level} */}
                    </Badge>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <Card
                            key={index}
                            className={`bg-gradient-to-br ${stat.bgGradient} border border-white/10 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300`}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}
                                    >
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">{stat.title}</p>
                                        <p className="text-2xl font-black text-white">{stat.value}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                                    <p className="text-sm text-green-400 font-medium">{stat.change}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-white flex items-center text-xl font-bold">
                            <Clock className="w-6 h-6 text-[#C4F000] mr-3" />
                            Atividade Recente
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentActivity.map((activity) => {
                            const Icon = activity.icon
                            return (
                                <div
                                    key={activity.id}
                                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className={`w-12 h-12 ${activity.bgColor} rounded-xl flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${activity.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium">{activity.message}</p>
                                        <p className="text-sm text-gray-400">{activity.time}</p>
                                    </div>
                                    {activity.type === "achievement" && (
                                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                                            +50 XP
                                        </Badge>
                                    )}
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>

                {/* Daily Missions */}
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm rounded-2xl">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-white flex items-center text-xl font-bold">
                            <Target className="w-6 h-6 text-purple-400 mr-3" />
                            Missões Diárias
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {dailyMissions.map((mission, index) => (
                            <div key={index} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${mission.completed
                                                ? "bg-gradient-to-r from-[#C4F000] to-cyan-400 border-[#C4F000]"
                                                : "border-gray-600"
                                                }`}
                                        >
                                            {mission.completed && <span className="text-black text-sm">✓</span>}
                                        </div>
                                        <span className={`font-medium ${mission.completed ? "text-[#C4F000]" : "text-white"}`}>
                                            {mission.title}
                                        </span>
                                    </div>
                                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                                        +{mission.xp} XP
                                    </Badge>
                                </div>
                                <div className="ml-9">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Progresso</span>
                                        <span className="text-white font-medium">
                                            {mission.progress}/{mission.total}
                                        </span>
                                    </div>
                                    <Progress value={(mission.progress / mission.total) * 100} className="h-2 bg-gray-700" />
                                </div>
                            </div>
                        ))}
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-bold rounded-xl mt-4">
                            <Trophy className="w-4 h-4 mr-2" />
                            Ver Todas as Missões
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Top Arenas */}
                <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-white flex items-center text-xl font-bold">
                            <Trophy className="w-6 h-6 text-[#C4F000] mr-3" />
                            Top Arenas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {topArenas.map((arena, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#C4F000] to-cyan-400 rounded-xl flex items-center justify-center text-black font-bold">
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">{arena.name}</p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <span>{arena.bookings} agendamentos</span>
                                            <span>⭐ {arena.rating}</span>
                                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                                                LVL {arena.level}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-[#C4F000]">{arena.revenue}</p>
                                    <div className="flex items-center text-sm text-green-400">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        {arena.trend}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gradient-to-br from-[#C4F000]/10 to-cyan-400/10 border border-[#C4F000]/20 backdrop-blur-sm rounded-2xl">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-white flex items-center text-xl font-bold">
                            <Zap className="w-6 h-6 text-[#C4F000] mr-3" />
                            Ações Rápidas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                            <Button className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold rounded-xl py-4 transition-all duration-300 hover:scale-105">
                                <Calendar className="w-5 h-5 mr-3" />
                                Novo Agendamento
                            </Button>
                            <Button
                                variant="outline"
                                className="border-2 border-white/20 text-white hover:bg-white/10 font-bold rounded-xl py-4 bg-transparent transition-all duration-300 hover:scale-105"
                            >
                                <MapPin className="w-5 h-5 mr-3" />
                                Adicionar Arena
                            </Button>
                            <Button
                                variant="outline"
                                className="border-2 border-white/20 text-white hover:bg-white/10 font-bold rounded-xl py-4 bg-transparent transition-all duration-300 hover:scale-105"
                            >
                                <Video className="w-5 h-5 mr-3" />
                                Ver Clips Épicos
                            </Button>
                            <Button
                                variant="outline"
                                className="border-2 border-white/20 text-white hover:bg-white/10 font-bold rounded-xl py-4 bg-transparent transition-all duration-300 hover:scale-105"
                            >
                                <BarChart3 className="w-5 h-5 mr-3" />
                                Relatórios Avançados
                            </Button>
                        </div>

                        {/* Achievement Preview */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <Award className="w-5 h-5 text-yellow-400 mr-2" />
                                    <span className="text-white font-bold">Próxima Conquista</span>
                                </div>
                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">87%</Badge>
                            </div>
                            <p className="text-sm text-gray-300 mb-2">Arena Master - Gerencie 15 arenas</p>
                            <Progress value={87} className="h-2 bg-gray-700" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
