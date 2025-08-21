"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import BreadcrumbComponent from "@/components/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProfileComponent from "@/components/layouts/authorized/profile";
import { AppSidebar } from "@/components/layouts/authorized/header";

export default function AppLayout({
    children,
    sheet,
}: Readonly<{
    children: React.ReactNode;
    sheet: React.ReactNode;
}>) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session || status !== "authenticated") {
            router.replace("/");
        }
    }, [session, status, router]);

    const user = {
        /* ...session.user, */
        id: 1,
        name: session?.user?.name || "Undefined User",
        role: "arena_owner",
        level: 5,
        xp: 750,
        maxXp: 1000,
        avatar: session?.user?.image || "/default-avatar.png",
        badges: ["rookie", "scorer"],
        stats: { clipsCreated: 10, totalViews: 1000, totalLikes: 50 },
    }

    return (
        <SidebarProvider className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <AppSidebar />
            <SidebarInset
                className="
      ml-[0px] h-screen overflow-y-auto
      md:ml-[10px] md:group-data-[collapsible=icon]:ml-[10px]
      scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#C4F000]/50
      hover:scrollbar-thumb-[#C4F000]/80
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-gradient-to-b
      [&::-webkit-scrollbar-thumb]:from-[#C4F000]
      [&::-webkit-scrollbar-thumb]:to-cyan-400
      [&::-webkit-scrollbar-thumb]:rounded-full
      scroll-smooth
    "
            >
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <BreadcrumbComponent />
                        <ProfileComponent />
                    </div>
                    {children}
                    {sheet}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}