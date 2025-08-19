"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Mail, Lock, User, Phone, Zap, Star } from "lucide-react"
import { signIn } from "next-auth/react"

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-slate-900/95 border border-white/10 backdrop-blur-xl rounded-2xl">
                <DialogHeader className="text-center pb-4">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#C4F000] to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-[#C4F000]/25">
                            <Zap className="w-8 h-8 text-black font-bold" />
                        </div>
                    </div>
                    <DialogTitle className="text-2xl font-black text-white">
                        Bem-vindo ao{" "}
                        <span className="bg-[#C4F000] bg-clip-text text-transparent">
                            Arenafy
                        </span>
                    </DialogTitle>
                    <p className="text-gray-400 text-sm">Faça login e comece sua jornada épica!</p>
                </DialogHeader>

                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white/5 rounded-xl p-1">
                        <TabsTrigger
                            value="login"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C4F000] data-[state=active]:to-cyan-400 data-[state=active]:text-black font-bold rounded-lg"
                        >
                            <span className="text-white">Entrar</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="register"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C4F000] data-[state=active]:to-cyan-400 data-[state=active]:text-black font-bold rounded-lg"
                        >
                            <span className="text-white">Cadastrar</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-6 mt-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white font-medium">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        className="pl-10 bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000] focus:ring-[#C4F000]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-white font-medium">
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000] focus:ring-[#C4F000]"
                                    />
                                </div>
                            </div>
                            <Button
                                className="w-full bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold py-3 rounded-xl shadow-lg shadow-[#C4F000]/25 transition-all duration-300"
                                onClick={() => signIn("credentials")}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                                        Entrando...
                                    </div>
                                ) : (
                                    "ENTRAR"
                                )}
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full bg-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900 px-3 text-gray-400 font-medium">Ou continue com</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border border-white/10 hover:bg-white/10 bg-transparent rounded-xl p-3 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-bold"
                            onClick={() => signIn("google")}
                            disabled={isLoading}
                            aria-label="Entrar com Google"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt=""
                                className="h-5 w-5"
                            />
                            <span className="text-white">Entrar com Google</span>
                        </Button>
                    </TabsContent>

                    <TabsContent value="register" className="space-y-6 mt-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-white font-medium">
                                    Nome Completo
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="name"
                                        placeholder="Seu nome"
                                        className="pl-10 bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000] focus:ring-[#C4F000]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="register-email" className="text-white font-medium">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="register-email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        className="pl-10 bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000] focus:ring-[#C4F000]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-white font-medium">
                                    Telefone
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="phone"
                                        placeholder="(11) 99999-9999"
                                        className="pl-10 bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000] focus:ring-[#C4F000]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="register-password" className="text-white font-medium">
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="register-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000] focus:ring-[#C4F000]"
                                    />
                                </div>
                            </div>
                            <Button
                                className="w-full bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold py-3 rounded-xl shadow-lg shadow-[#C4F000]/25 transition-all duration-300"
                                onClick={() => signIn("credentials")}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                                        Criando conta...
                                    </div>
                                ) : (
                                    "CRIAR CONTA"
                                )}
                            </Button>
                        </div>

                        {/* Welcome Package */}
                        <div className="bg-gradient-to-r from-[#C4F000]/10 to-cyan-400/10 border border-[#C4F000]/20 rounded-xl p-4">
                            <div className="text-center mb-3">
                                <h4 className="text-white font-bold flex items-center justify-center">
                                    <Star className="w-4 h-4 text-[#C4F000] mr-2" />
                                    PACOTE DE BOAS-VINDAS
                                </h4>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div>
                                    <Badge className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black text-xs">+1000 XP</Badge>
                                    <p className="text-xs text-gray-400 mt-1">XP Inicial</p>
                                </div>
                                <div>
                                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">3 Badges</Badge>
                                    <p className="text-xs text-gray-400 mt-1">Conquistas</p>
                                </div>
                                <div>
                                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">Premium 7d</Badge>
                                    <p className="text-xs text-gray-400 mt-1">Grátis</p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
