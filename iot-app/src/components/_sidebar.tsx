import { HardHat, Home, MapIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

const AppSidebar = () => {
  const items = [
    {
      title: 'Dashboard',
      url: '/home',
      icon: Home,
    },
    {
      title: 'Mapa',
      url: '#',
      icon: MapIcon,
    },
    {
      title: 'Vendedores',
      url: '/vendedores',
      icon: HardHat,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex justify-center items-center">
        <h1>Gutinho Inc.</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="select-none">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export { AppSidebar };
