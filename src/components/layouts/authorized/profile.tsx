import { ChartAreaIcon, LogOut, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export default function ProfileComponent() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className="flex items-center space-x-4">
            {session ? (
                <>
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
                        <PopoverContent
                            className="w-56 p-0 bg-gradient-to-br bg-slate-900/95 border-white/10 backdrop-blur-xl rounded-xl shadow-lg shadow-[#C4F000]/10 animate-in fade-in-0 zoom-in-95 duration-200"
                        >
                            <Command className="bg-transparent">
                                <CommandList>
                                    <CommandGroup>
                                        <CommandItem
                                            className="text-white font-bold text-sm py-3 px-4 hover:bg-gradient-to-r hover:from-[#C4F000]/20 hover:to-cyan-400/20 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                                            onSelect={() => {
                                                router.push("/app");
                                            }}
                                        >
                                            <ChartAreaIcon className="w-5 h-5 mr-3 text-white" />
                                            <span className="text-white">Acessar</span>
                                        </CommandItem>
                                        <CommandItem
                                            className="text-white font-bold text-sm py-3 px-4 hover:bg-gradient-to-r hover:from-[#C4F000]/20 hover:to-cyan-400/20 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                                            onSelect={() => {
                                                router.push("/profile")
                                            }}
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
                </>
            ) : (
                <Button
                    className="bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black hover:from-[#B8E000] hover:to-cyan-300 font-bold px-8 py-2 rounded-xl shadow-lg shadow-[#C4F000]/25 transition-all duration-300 hover:scale-105"
                >
                    ENTRAR
                </Button>
            )}
        </div>
    );
}