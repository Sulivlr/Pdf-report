import React from 'react';
import Sidebar from '../Sidebar/SideBar';
import TopBar from '../Topbar/TopBar';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="fixed left-0 top-0 h-full">
        <Sidebar />
      </aside>

      <div className="flex-1 ml-[300px]">
        <header className="fixed top-0 right-0 left-[300px] z-50">
          <TopBar />
        </header>

        <main className="pt-[64px] h-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;