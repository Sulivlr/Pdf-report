import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { cn } from '../../../lib/utils';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { selectFiles } from '../FileView/filesSlice';
import { fetchFiles } from '../FileView/filesThunks';
import type { FileEntity } from '../../../types';

const SidebarDates = () => {
  const dispatch = useAppDispatch();
  const files = useAppSelector(selectFiles);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });
  };

  const groupedFiles = files.reduce<Record<string, FileEntity[]>>(
    (acc, file) => {
      const date = formatDate(file.uploadedAt);
      if (!acc[date]) acc[date] = [];
      acc[date].push(file);
      return acc;
    },
    {},
  );

  return (
    <div className="w-64 p-2 space-y-3">
      {Object.entries(groupedFiles).map(([date, files]) => (
        <div key={date} className="space-y-1.5">
          <h3 className="text-sm font-medium text-muted-foreground px-2">
            {date}
          </h3>
          <div className="space-y-1">
            {files.map((file) => (
              <Card
                key={file.id}
                className="hover:bg-accent/50 transition-colors border-0 shadow-none"
              >
                <CardContent className="p-2 flex items-center gap-2">
                  <Badge
                    className={cn(
                      'w-6 h-6 rounded-full',
                      'flex items-center justify-center',
                      'bg-primary/80',
                      'text-xs font-medium',
                    )}
                  >
                    PDF
                  </Badge>
                  <span className="text-sm font-medium truncate">
                    {file.name}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarDates;
