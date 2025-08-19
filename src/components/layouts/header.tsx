import { ChartAreaIcon, LogOut, Play, User, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { LoginModal } from "@/app/auth/@sheet/login.modal";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

export default function Header() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { data: session } = useSession();

    const router = useRouter();

    return (
        <>
            <header className="relative z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#C4F000] to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-[#C4F000]/25">
                                <Zap className="w-7 h-7 text-black font-bold" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black bg-gradient-to-r from-[#C4F000] via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                ARENA<span className="text-white">CLIPS</span>
                            </h1>
                            <p className="text-xs text-gray-400 font-medium">LEVEL UP YOUR GAME</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* <ThemeToggle />  */}

                        {session ? (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="flex items-center space-x-3 cursor-pointer hover:bg-white/5 rounded-xl p-2 transition-all duration-300">
                                        <div className="relative">
                                            <Image
                                                src={session.user?.image || "/default-avatar.png"}
                                                alt="User avatar"
                                                width={40}
                                                height={40}
                                                className="rounded-full border-2 border-[#C4F000]/50"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white/20"></div>
                                        </div>
                                        <span className="text-sm font-semibold text-white">
                                            {session.user?.name || "Player"}
                                        </span>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-56 p-0 bg-gradient-to-br bg-slate-900/95 border-white/10 backdrop-blur-xl rounded-xl shadow-lg shadow-[#C4F000]/10 animate-in fade-in-0 zoom-in-95 duration-200">
                                    <Command className="bg-transparent">
                                        <CommandList>
                                            <CommandGroup>
                                                <CommandItem
                                                    className="text-white font-bold text-sm py-3 px-4 hover:bg-gradient-to-r hover:from-[#C4F000]/20 hover:to-cyan-400/20 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                                                    onSelect={() => router.push("/app")}
                                                >
                                                    <ChartAreaIcon className="w-5 h-5 mr-3 text-white" />
                                                    <span className="text-white">Acessar</span>
                                                </CommandItem>
                                                <CommandItem
                                                    className="text-white font-bold text-sm py-3 px-4 hover:bg-gradient-to-r hover:from-[#C4F000]/20 hover:to-cyan-400/20 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                                                    onSelect={() => router.push("/profile")}
                                                >
                                                    <User className="w-5 h-5 mr-3 text-white" />
                                                    <span className="text-white">Perfil</span>
                                                </CommandItem>
                                                <CommandItem
                                                    className="text-white font-bold text-sm py-3 px-4 hover:bg-gradient-to-r hover:from-[#C4F000]/20 hover:to-cyan-400/20 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                                                    onSelect={() => signOut()}
                                                >
                                                    <LogOut className="w-5 h-5 mr-3 text-white" />
                                                    <span className="text-white">Sair</span>
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <Button
                                onClick={() => setIsLoginOpen(true)}
                                className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold px-8 py-2 rounded-xl shadow-lg shadow-[#C4F000]/25 transition-all duration-300 hover:scale-105"
                            >
                                ENTRAR
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>

    )
}