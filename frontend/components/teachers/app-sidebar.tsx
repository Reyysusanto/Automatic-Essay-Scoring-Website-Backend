'use client';

import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const TeachersNav = [
  {
    title: 'Dashboard',
    url: '/teachers/dashboard',
  },
  {
    title: 'Ujian',
    url: '/teachers/exams',
  },
  {
    title: 'Nilai',
    url: '/teachers/scores',
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <Sidebar className="bg-black">
        <SidebarContent className="bg-white relative overflow-hidden">
          <div className="px-4 py-6 w-full h-full">
            <div className="w-full h-full flex flex-col justify-between items-center">
              <div className="w-full h-auto flex flex-col jusify-start items-start gap-[1.1rem] min-[400px]:gap-[2.2rem]">
                <div className="flex justify-center items-center gap-4 w-full">
                  <h2 className="font-bold text-2xl text-black">
                    <span className="text-primary-color">Auto</span>Grade
                  </h2>
                </div>
                <div className="w-full px-6 md:px-2">
                  <div className="flex flex-col justify-start items-start w-full">
                    {TeachersNav.map((nav) => {
                      const isActive =
                        pathname === nav.url || pathname.startsWith(nav.url);

                      return (
                        <Link
                          className={`group/nav-item flex flex-row justify-start items-center cursor-pointer gap-4 px-4 py-3 w-full rounded-lg transition-colors duration-200 z-2 ${
                            isActive ? 'text-primary-color' : 'hover:bg-white'
                          }`}
                          key={nav.title}
                          href={nav.url}
                        >
                          <nav
                            className={`transition-colors duration-200 ${
                              isActive
                                ? 'text-secondary-one'
                                : 'text-black group-hover/nav-item:text-secondary-one'
                            }`}
                          />
                          <p
                            className={`font-primary transition-colors duration-200 ${
                              isActive
                                ? 'text-secondary-one'
                                : 'text-black group-hover/nav-item:text-secondary-one'
                            }`}
                          >
                            {nav.title}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="mt-auto px-4">
                  <Button
                    className="w-full bg-primary-color h-9 rounded-md text-white hover:bg-red-600 transition-colors"
                    variant="default"
                    size="sm"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
};
