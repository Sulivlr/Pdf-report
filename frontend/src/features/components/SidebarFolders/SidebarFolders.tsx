import { Folder } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import {
  selectFolders,
  selectSelectedFolderId,
  setSelectedFolder,
} from './foldersSlice';
import { fetchFolders } from './foldersThunks';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const SidebarFolders = () => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);
  const selectedFolderId = useAppSelector(selectSelectedFolderId);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFolders());
  }, [dispatch]);

  const handleFolderClick = (folderId: number) => {
    dispatch(setSelectedFolder(folderId));
    navigate(`/folders/${folderId}`);
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 rounded-md">
      <h2 className="mb-4 text-lg font-semibold">Папки</h2>
      <ul className="space-y-2">
        {folders.map((folder) => (
          <li
            key={folder.id}
            onClick={() => handleFolderClick(folder.id)}
            className={cn(
              'flex items-center gap-2 p-2 cursor-pointer rounded-md',
              'hover:bg-neutral-200 transition-colors',
              selectedFolderId === folder.id && 'bg-neutral-200',
            )}
          >
            <Folder className="text-blue-500" />
            <Tooltip>
              <TooltipTrigger>
                <span className="font-medium truncate max-w-[150px]">
                  {folder.name}
                </span>
              </TooltipTrigger>
              <TooltipContent>{folder.name}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarFolders;
