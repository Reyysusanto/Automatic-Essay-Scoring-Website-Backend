'use client';

import { useState } from 'react';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/store/useStore';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export const StudentsNav = [
  {
    title: 'Dashboard',
    url: '/students/dashboard',
  },
  {
    title: 'Ujian',
    children: [
      { title: 'Kerjakan', url: '/students/exams/do' },
      { title: 'Hasil', url: '/students/exams/result' },
      { title: 'Riwayat', url: '/students/exams/history' },
    ],
  },
  {
    title: 'Nilai',
    url: '/students/scores',
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleLogOut = () => {
    const { clearAuth } = useAuthStore.getState();
    clearAuth();
    Cookies.remove('access_token', { sameSite: 'strict', secure: true });
    Cookies.remove('refresh_token', { sameSite: 'strict', secure: true });
    router.push('/login');
    toast.error('Successfully logged out');
  };

  return (
    <Sidebar className="bg-black w-64">
      <SidebarContent className="bg-white relative overflow-hidden">
        <div className="px-4 py-6 w-full h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-center items-center gap-4 mb-6">
              <h2 className="font-bold text-2xl text-black">
                <span className="text-primary-color">Auto</span>Grade
              </h2>
            </div>

            <div className="flex flex-col">
              {StudentsNav.map((nav) => {
                const isActive =
                  pathname === nav.url ||
                  (nav.children &&
                    nav.children.some((child) =>
                      pathname.startsWith(child.url)
                    ));

                if (nav.children) {
                  const isOpen = openMenu === nav.title;
                  return (
                    <div key={nav.title} className="w-full">
                      <button
                        onClick={() => setOpenMenu(isOpen ? null : nav.title)}
                        className={`flex justify-between items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                          isActive ? 'text-primary-color' : 'text-black'
                        }`}
                      >
                        <span>{nav.title}</span>
                        {isOpen ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="flex flex-col ml-6 mt-1 space-y-2">
                          {nav.children.map((child) => {
                            const childActive = pathname.startsWith(child.url);
                            return (
                              <Link
                                key={child.title}
                                href={child.url}
                                className={`px-2 py-1 text-sm rounded-md transition-colors ${
                                  childActive
                                    ? 'text-primary-color font-semibold'
                                    : 'text-gray-600 hover:text-primary-color'
                                }`}
                              >
                                {child.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={nav.title}
                    href={nav.url}
                    className={`px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-primary-color font-semibold'
                        : 'text-black hover:text-primary-color'
                    }`}
                  >
                    {nav.title}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto px-4">
              <Button
                onClick={handleLogOut}
                className="w-full bg-primary-color h-9 rounded-md text-white hover:bg-emerald-700 transition-colors"
                variant="default"
                size="sm"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
