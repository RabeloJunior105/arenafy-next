import { CrudConfig } from "@/components/crud/types";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users } from "lucide-react";
import Link from "next/link";

export const arenaConfig: CrudConfig = {
  entityName: "Arena",
  endpoint: "/arenas",
  fields: [
    { name: "name", label: "Nome da Arena", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "domain", label: "Domínio", type: "text", required: false },
    {
      name: "shouldAttachUserByDomain",
      label: "Anexar Usuário por Domínio",
      type: "select",
      required: false,
      options: [
        { value: "true", label: "Sim" },
        { value: "false", label: "Não" },
      ],
    },
    { name: "avatarUrl", label: "URL do Avatar", type: "text", required: false },
  ],
  filters: [
  ],
  columns: [
    {
      name: "name",
      label: "Arena",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={item.avatarUrl || "/placeholder.svg"}
            alt={item.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <Link href={`/arena/${item.id}`} className="hover:text-[#C4F000] transition-colors">
              <div className="font-bold text-white hover:text-[#C4F000]">{item.name}</div>
            </Link>
            <div className="text-sm text-gray-400 flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {item.slug}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "domain",
      label: "Domínio",
      render: (item) => (
        <div className="text-white">{item.domain || "N/A"}</div>
      ),
    },
    {
      name: "shouldAttachUserByDomain",
      label: "Anexar por Domínio",
      render: (item) => (
        <Badge
          className={`bg-gradient-to-r ${item.shouldAttachUserByDomain
            ? "from-green-400 to-emerald-500"
            : "from-red-400 to-red-600"
            } text-white font-bold`}
        >
          {item.shouldAttachUserByDomain ? "Sim" : "Não"}
        </Badge>
      ),
    },
    {
      name: "userCount",
      label: "Usuários",
      render: (item) => (
        <div className="flex items-center text-[#C4F000] font-bold">
          <Users className="w-4 h-4 mr-1" />
          {item.user?.length || 0}
        </div>
      ),
    },
    {
      name: "organizationCount",
      label: "Organizações",
      render: (item) => (
        <div className="flex items-center text-blue-400 font-bold">
          <Users className="w-4 h-4 mr-1" />
          {item.organization?.length || 0}
        </div>
      ),
    },
  ],
  badges: {
    shouldAttachUserByDomain: {
      true: { label: "Sim", gradient: "from-green-400 to-emerald-500" },
      false: { label: "Não", gradient: "from-red-400 to-red-600" },
    },
  },
  actions: {
    view: true,
    edit: true,
    delete: true,
  },
  permissions: {
    canEdit: (userRole) => ["admin", "arena_owner"].includes(userRole),
    canDelete: (userRole) => userRole === "admin",
  },
  viewModeOptions: ["cards", "table"],
};