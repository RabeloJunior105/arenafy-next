"use client"

import GenericCrud from "@/components/crud/GenericCrud";
import { arenaConfig } from "./arenaConfig";

interface ArenaModuleProps {
    userRole: string;
}

export default function ArenaModule({ userRole }: ArenaModuleProps) {
    return <GenericCrud config={arenaConfig} userRole={userRole} />;
}