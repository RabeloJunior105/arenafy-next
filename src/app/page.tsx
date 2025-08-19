"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Video, Zap } from "lucide-react";
import { useState } from "react";
import { LoginModal } from "./auth/@sheet/login.modal";
import Header from "@/components/layouts/header";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  )
}