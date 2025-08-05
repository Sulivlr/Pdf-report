import { ScrollArea } from '../../../components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Calendar } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';

interface DateItem {
  id: string;
  date: string;
  month: string;
  year: number;
  filesCount: number;
  isActive?: boolean;
}

const mockDates: DateItem[] = [
  {
    id: '1',
    date: '20',
    month: 'Март',
    year: 2024,
    filesCount: 3,
    isActive: true,
  },
  { id: '2', date: '15', month: 'Март', year: 2024, filesCount: 2 },
  { id: '3', date: '10', month: 'Март', year: 2024, filesCount: 3 },
  { id: '4', date: '28', month: 'Февраль', year: 2024, filesCount: 2 },
  { id: '5', date: '15', month: 'Февраль', year: 2024, filesCount: 3 },
  { id: '6', date: '25', month: 'Январь', year: 2024, filesCount: 4 },
  { id: '7', date: '10', month: 'Январь', year: 2024, filesCount: 2 },
];

const DatesView = () => {
  return (
    <div className="flex h-screen bg-background p-4">
      <Card className="flex-1 bg-background">
        <CardHeader className="border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Просмотр по датам
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDates.map((item) => (
                <div
                  key={item.id}
                  className={`
                    p-4 rounded-lg border
                    ${item.isActive ? 'bg-accent/60 border-accent' : 'bg-card'}
                    hover:bg-accent/60 hover:border-accent
                    transition-colors duration-200
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">
                        {item.date} {item.month} {item.year}
                      </span>
                    </div>
                    <Badge variant="outline">
                      {item.filesCount}{' '}
                      {item.filesCount === 1 ? 'файл' : 'файла'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatesView;
