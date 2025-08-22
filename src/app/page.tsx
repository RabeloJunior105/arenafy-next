"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, MapPin, Play, Star, Target, TrendingUp, Trophy, Users, Video, Zap } from "lucide-react";
import { useState } from "react";
import { LoginModal } from "./auth/@sheet/login.modal";
import Header from "@/components/layouts/header";
import { Card, CardContent } from "@/components/ui/card";


export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const featuredClips = [
    {
      id: 1,
      title: "JOGADA ÉPICA - FINAL CHAMPIONSHIP",
      arena: "Arena Central",
      court: "Quadra 1",
      duration: "0:45",
      likes: 1234,
      views: 15600,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rarity: "legendary",
      xp: 150,
    },
    {
      id: 2,
      title: "DRIBLE INSANO - COMBO X3",
      arena: "SportZone Elite",
      court: "Quadra 2",
      duration: "0:32",
      likes: 892,
      views: 8900,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rarity: "epic",
      xp: 100,
    },
    {
      id: 3,
      title: "DEFESA IMPOSSÍVEL",
      arena: "Urban Court",
      court: "Quadra 3",
      duration: "0:28",
      likes: 567,
      views: 4200,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rarity: "rare",
      xp: 75,
    },
  ]

  const topArenas = [
    {
      id: 1,
      name: "Arena Central",
      location: "Centro, SP",
      courts: 4,
      rating: 4.8,
      level: 15,
      xp: 2850,
      maxXp: 3000,
      image: "/placeholder.svg?height=150&width=200",
      badge: "champion",
    },
    {
      id: 2,
      name: "SportZone Elite",
      location: "Vila Madalena, SP",
      courts: 6,
      rating: 4.9,
      level: 12,
      xp: 1950,
      maxXp: 2500,
      image: "/placeholder.svg?height=150&width=200",
      badge: "pro",
    },
  ]

  const getRarityColor = (rarity: string) => {
    const colors = {
      legendary: "from-yellow-400 to-orange-500",
      epic: "from-purple-400 to-pink-500",
      rare: "from-blue-400 to-cyan-500",
      common: "from-gray-400 to-gray-600",
    }
    return colors[rarity as keyof typeof colors] || colors.common
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              🔥 NOVA TEMPORADA DISPONÍVEL
            </Badge>
          </div>

          <h2 className="text-6xl md:text-8xl font-black mb-6 text-white leading-tight">
            CAPTURE SUA
            <span className="block bg-gradient-to-r from-[#C4F000] via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              JOGADA ÉPICA
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Grave, compartilhe e reviva os melhores momentos dos seus jogos.
            <span className="text-[#C4F000] font-semibold">Ganhe XP</span>, desbloqueie conquistas e
            <span className="text-cyan-400 font-semibold"> domine as arenas</span>!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold px-12 py-4 text-lg rounded-xl shadow-lg shadow-[#C4F000]/25 transition-all duration-300 hover:scale-105"
              onClick={() => setIsLoginOpen(true)}
            >
              <Play className="w-6 h-6 mr-3" />
              COMEÇAR AGORA
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/10 font-bold px-12 py-4 text-lg rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-transparent"
            >
              <Video className="w-6 h-6 mr-3" />
              VER CLIPS ÉPICOS
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-black text-[#C4F000] mb-1">50K+</div>
              <div className="text-sm text-gray-400 font-medium">Clips Criados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-cyan-400 mb-1">200+</div>
              <div className="text-sm text-gray-400 font-medium">Arenas Ativas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400 mb-1">15K+</div>
              <div className="text-sm text-gray-400 font-medium">Jogadores</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clips */}
      <section className="py-12 md:py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white flex items-center mb-2">
                <Trophy className="w-8 h-8 md:w-10 md:h-10 text-[#C4F000] mr-3 md:mr-4" />
                CLIPS EM DESTAQUE
              </h3>
              <p className="text-gray-400 text-sm md:text-base">Os melhores momentos da semana</p>
            </div>
            <Button
              variant="outline"
              className="mt-4 md:mt-0 border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
            >
              Ver Todos
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredClips.map((clip) => (
              <Card
                key={clip.id}
                className="bg-white/5 border border-white/10 hover:border-[#C4F000]/50 transition-all duration-300 group cursor-pointer backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={clip.thumbnail || "/placeholder.svg"}
                    alt={clip.title}
                    className="w-full h-40 md:h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Rarity Border */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(clip.rarity)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#C4F000] to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-7 h-7 md:w-8 md:h-8 text-black ml-1" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <Badge className={`bg-gradient-to-r ${getRarityColor(clip.rarity)} text-white font-bold`}>
                      {clip.rarity.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3 flex space-x-2">
                    <Badge className="bg-black/70 text-white">{clip.duration}</Badge>
                  </div>

                  {/* XP Badge */}
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                      +{clip.xp} XP
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 md:p-6">
                  <h4 className="font-black text-white mb-2 md:mb-3 text-base md:text-lg leading-tight">
                    {clip.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-400 mb-3 md:mb-4">
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      {clip.arena} • {clip.court}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm">
                      <div className="flex items-center text-[#C4F000]">
                        <Star className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {clip.likes.toLocaleString()}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Video className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {clip.views.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Arenas */}
      <section className="py-12 md:py-16 px-4 bg-white/5 backdrop-blur-sm relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white flex items-center mb-2">
                <Award className="w-8 h-8 md:w-10 md:h-10 text-[#C4F000] mr-3 md:mr-4" />
                ARENAS LENDÁRIAS
              </h3>
              <p className="text-gray-400 text-sm md:text-base">As arenas mais épicas da cidade</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {topArenas.map((arena) => (
              <Card
                key={arena.id}
                className="bg-white/5 border border-white/10 hover:border-[#C4F000]/50 transition-all duration-300 group cursor-pointer backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={arena.image || "/placeholder.svg"}
                    alt={arena.name}
                    className="w-full h-32 md:h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Level Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                      LVL {arena.level}
                    </Badge>
                  </div>

                  {/* Arena Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl">
                      {getBadgeIcon(arena.badge)}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-black/70 text-[#C4F000] font-bold">⭐ {arena.rating}</Badge>
                  </div>
                </div>

                <CardContent className="p-4 md:p-6">
                  <h4 className="font-black text-white mb-1 md:mb-2 text-lg md:text-xl">{arena.name}</h4>
                  <div className="flex items-center text-sm text-gray-400 mb-3 md:mb-4">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    {arena.location}
                  </div>

                  {/* XP Progress Bar */}
                  <div className="mb-3 md:mb-4">
                    <div className="flex justify-between text-xs md:text-sm mb-1 md:mb-2">
                      <span className="text-gray-400">XP Progress</span>
                      <span className="text-[#C4F000] font-bold">
                        {arena.xp}/{arena.maxXp}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#C4F000] to-cyan-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(arena.xp / arena.maxXp) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <div className="flex items-center text-gray-300">
                      <Users className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-[#C4F000]" />
                      {arena.courts} quadras
                    </div>
                    <div className="flex items-center text-[#C4F000] font-bold">
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />+{Math.floor(Math.random() * 50 + 10)} hoje
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-12 md:py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2 md:mb-4">
              SISTEMA DE{" "}
              <span className="bg-gradient-to-r from-[#C4F000] to-cyan-400 bg-clip-text text-transparent">
                PROGRESSÃO
              </span>
            </h3>
            <p className="text-base md:text-lg text-gray-400">Evolua, desbloqueie conquistas e torne-se uma lenda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-4 md:p-6 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Target className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">MISSÕES DIÁRIAS</h4>
              <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4">Complete desafios e ganhe XP extra</p>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">+500 XP</Badge>
            </Card>

            <Card className="bg-gradient-to-br from-[#C4F000]/10 to-cyan-400/10 border border-[#C4F000]/20 rounded-2xl p-4 md:p-6 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#C4F000] to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Trophy className="w-7 h-7 md:w-8 md:h-8 text-black" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">CONQUISTAS</h4>
              <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4">Desbloqueie títulos e badges exclusivos</p>
              <Badge className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black">47/100</Badge>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-4 md:p-6 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Award className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">RANKING</h4>
              <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4">Compete com jogadores do mundo todo</p>
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">#1,247</Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-8 md:p-12 border border-white/10">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-3 md:mb-4">
              PRONTO PARA SER UMA
              <span className="block bg-gradient-to-r from-[#C4F000] to-cyan-400 bg-clip-text text-transparent">
                LENDA?
              </span>
            </h3>
            <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
              Junte-se à comunidade, grave suas melhores jogadas e conquiste o topo do ranking!
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold px-12 md:px-16 py-4 md:py-6 text-lg md:text-xl rounded-xl md:rounded-2xl shadow-lg shadow-[#C4F000]/25 transition-all duration-300 hover:scale-105"
              onClick={() => setIsLoginOpen(true)}
            >
              <Zap className="w-5 h-5 mr-2 md:mr-3" />
              COMEÇAR JORNADA
            </Button>
          </div>
        </div>
      </section>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  )
}