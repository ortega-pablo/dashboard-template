import { Card } from '@/components/ui/card';

interface Sport {
  id: string;
  nombre: string;
  icon: string;
  count: number;
}

interface SportsChartsProps {
  sports: Sport[];
}

export function SportsCharts({ sports }: SportsChartsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Promociones por Deporte</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sports.map((sport) => (
          <div
            key={sport.id}
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="text-5xl mb-3">{sport.icon}</div>
            <div className="font-semibold text-lg text-center mb-1">{sport.nombre}</div>
            <div className="text-3xl font-bold text-blue-600">{sport.count}</div>
            <div className="text-sm text-slate-600">promociones</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
