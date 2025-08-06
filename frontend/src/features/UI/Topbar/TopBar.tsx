import { useNavigate } from 'react-router-dom';
import NewFolder from './NewFolder';
import { cn } from '@/lib/utils';

const drawerWidth = 299;

const TopBar = () => {
  const navigate = useNavigate();
  const handleCreateFolder = (folderId: number) => {
    navigate(`/folders/${folderId}`);
  };

  return (
    <>
      <div
        className={cn(
          'fixed z-50 flex items-center justify-between w-full px-6 py-4 shadow-lg',
          `ml-[${drawerWidth}px]`,
          'bg-gradient-to-r from-blue-700 to-blue-500',
        )}
        style={{ width: `calc(100% - ${drawerWidth}px)` }}
      >
        <h1 className="text-lg text-white font-semibold">PDF Платформа</h1>
        <NewFolder onSubmit={handleCreateFolder} />
      </div>
    </>
  );
};

export default TopBar;
