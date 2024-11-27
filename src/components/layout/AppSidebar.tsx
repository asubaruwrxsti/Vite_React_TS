import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AppRoutes } from "@/lib/constants"
import { getPocketBase } from "@/lib/pocketbase";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {AppRoutes.map((item) => {
                                const isProtected = item.protected;
                                const isLoggedIn = getPocketBase().authStore.model !== null;

                                // Render the item only if it's not protected or the user is logged in
                                if (!isProtected || isLoggedIn) {
                                    return (
                                        <SidebarMenuItem key={item.name}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.path}>
                                                    <item.icon />
                                                    <span>{item.name}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }

                                return null;
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
