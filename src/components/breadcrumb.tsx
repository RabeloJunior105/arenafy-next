'use client'

import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "./ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";


type BreadcrumbComponentProps = {
    ignoreParams?: string[];
};

const isUUID = (segment: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(segment);
};

export default function BreadcrumbComponent({ ignoreParams = [] }: BreadcrumbComponentProps) {
    const pathname = usePathname();
    const segments = pathname
        .split("/")
        .filter(Boolean)
        .filter(segment => !ignoreParams.includes(segment))
        .filter(segment => !isUUID(segment));

    const formatSegment = (segment: string) =>
        decodeURIComponent(segment)
            .replace(/-/g, " ")
            .replace(/^\w/, (c) => c.toUpperCase());

    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return (
            <BreadcrumbItem key={href}>
                {isLast ? (
                    <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                ) : (
                    <>
                        <BreadcrumbLink asChild>
                            <Link href={href}>{formatSegment(segment)}</Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                    </>
                )}
            </BreadcrumbItem>
        );
    });

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 text-white">
                <SidebarTrigger className="-ml-1 " />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {segments.length > 0 && (
                            <BreadcrumbSeparator className="hidden md:block" />
                        )}
                        {breadcrumbs}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}