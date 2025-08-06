import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useAppDispatch } from '@/app/hooks';
import {
  createFolder,
  fetchFolders,
} from '../../components/SidebarFolders/foldersThunks';
import { toast } from 'react-toastify';

interface NewFolderProps {
  onSubmit: (folderId: number) => void;
}

const NewFolder: React.FC<NewFolderProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newFolder = await dispatch(
        createFolder({ name: folderName }),
      ).unwrap();
      setFolderName('');
      setIsOpen(false);
      onSubmit(newFolder.id);
      await dispatch(fetchFolders());
      toast.success('Папка создана');
    } catch {
      toast.error('Не удалось создать папку');
    }
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="bg-white text-blue-700 hover:bg-white/90 border-transparent cursor-pointer"
      >
        <Plus className="w-4 h-4 mr-2" />
        Создать папку
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Создать новую папку</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="folderName">Имя папки</Label>
                <input
                  id="folderName"
                  type="text"
                  value={folderName}
                  onChange={onFieldChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Введите имя папки"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={!folderName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Создать
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewFolder;
