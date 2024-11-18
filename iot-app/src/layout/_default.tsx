import { AppSidebar } from '@/components';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

const Default = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export { Default };
export default Default;
