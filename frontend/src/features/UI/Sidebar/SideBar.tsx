import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarFolders from '../../components/SidebarFolders/SidebarFolders';
import SidebarDates from '../../components/SidebarDates/SidebarDates';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const title = currentPath === '/folders' ? 'Общая' : 'Файлы';

  return (
    <div className="w-[300px] h-screen bg-[#f7f9fc] shadow-md rounded-r-lg overflow-y-auto">
      <ScrollArea className="h-full">
        <div className="p-8">
          <h2 className="text-lg font-bold text-blue-600 mb-4">{title}</h2>

          <div className="w-full bg-white rounded shadow mb-12 flex">
            <NavLink
              to="/date"
              className={cn(
                'flex-1 px-4 py-2 text-sm text-center transition-colors',
                currentPath === '/date' ? 'bg-blue-50' : 'hover:bg-gray-50',
              )}
            >
              Дата
            </NavLink>
            <NavLink
              to="/folders"
              className={cn(
                'flex-1 px-4 py-2 text-sm text-center transition-colors',
                currentPath === '/folders' ? 'bg-blue-50' : 'hover:bg-gray-50',
              )}
            >
              Папки
            </NavLink>
          </div>

          {currentPath === '/date' ? <SidebarDates /> : <SidebarFolders />}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
