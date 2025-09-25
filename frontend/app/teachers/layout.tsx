'use client';

import { AppSidebar } from '@/components/teachers/app-sidebar';
import Header from '@/components/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { NunitoSansFonts } from '@/lib/fonts';

export default function TeachersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex w-full h-full">
        <AppSidebar />
        <div className="flex flex-col w-full min-h-screen">
          <Header />
          <main className={`flex-1 bg-gray-50 ${NunitoSansFonts.className}`}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
