import { ScrollArea } from '../../../components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';
import { FileText } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cn } from '../../../lib/utils';
import React, { type FormEvent, useEffect, useState } from 'react';
import { selectFiles } from './filesSlice';
import { fetchFiles, createFile } from './filesThunks';
import {
  selectSelectedFolderId,
  selectActiveFolder,
  setSelectedFolder,
} from '../SidebarFolders/foldersSlice';
import PDFViewer from '../PdfView/PdfView';
import type { FileEntity, FileMutation } from '../../../types';
import { useParams } from 'react-router-dom';
import FileInput from '../../UI/FileInput/FileInput';
import { Button } from '../../../components/ui/button';

const FolderContent = () => {
  const dispatch = useAppDispatch();
  const files = useAppSelector(selectFiles);
  const selectedFolderId = useAppSelector(selectSelectedFolderId);
  const activeFolder = useAppSelector(selectActiveFolder);
  const [selectedFile, setSelectedFile] = useState<FileEntity | null>(null);
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<FileMutation>({
    name: '',
    folderId: 0,
    file: null,
  });

  useEffect(() => {
    dispatch(fetchFiles());

    if (id) {
      const numericId = Number(id);
      dispatch(setSelectedFolder(numericId));
    } else {
      dispatch(setSelectedFolder(null));
    }
  }, [dispatch, id]);

  const filteredFiles = selectedFolderId
    ? files.filter((file) => file.folderId === selectedFolderId)
    : files;

  const handleFileClick = (file: FileEntity) => {
    const fileWithPath = {
      ...file,
      path: `${process.env.REACT_APP_API_URL}/files/${file.id}/download`,
    };
    setSelectedFile(fileWithPath);
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
        name: files[0].name,
        folderId: selectedFolderId ?? 1,
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createFile(state)).unwrap();
      setState({ name: '', folderId: 0, file: null });
      dispatch(fetchFiles());
    } catch (error) {
      console.error('Ошибка загрузки файла', error);
    }
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto mt-10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl mb-4">
            {activeFolder ? activeFolder.name : 'Все файлы'}
          </CardTitle>

          {/* Форма загрузки и отправки файла */}
          <form onSubmit={onSubmit} className="flex items-center gap-4 mb-6">
            <FileInput
              name="file"
              label="Выберите файл"
              onChange={fileInputChangeHandler}
            />
            <Button
              type="submit"
              disabled={!state.file}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create
            </Button>
          </form>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-2">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file, index) => (
                  <div key={file.id}>
                    {index !== 0 && <Separator />}
                    <div
                      onClick={() => handleFileClick(file)}
                      className={cn(
                        'flex justify-between items-center py-3 px-2',
                        'hover:bg-muted rounded-md transition-colors cursor-pointer',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="text-muted-foreground" />
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Создано:{' '}
                            {new Date(file.uploadedAt).toLocaleDateString(
                              'ru-RU',
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  {selectedFolderId ? 'В этой папке нет файлов' : 'Нет файлов'}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <PDFViewer
        isOpen={!!selectedFile}
        onClose={() => setSelectedFile(null)}
        file={selectedFile}
      />
    </>
  );
};

export default FolderContent;
