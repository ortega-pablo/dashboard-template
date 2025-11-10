import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Sport {
  name: string;
  percentage: number;
  color: string;
}

const sports: Sport[] = [
  { name: "Fútbol", percentage: 45, color: "bg-chart-1" },
  { name: "UFC/Deportes de combate", percentage: 22, color: "bg-chart-3" },
  { name: "Otros", percentage: 33, color: "bg-chart-5" },
];

export const SportsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Promos Deporte</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sports.map((sport) => (
          <div key={sport.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{sport.name}</span>
              <span className="text-muted-foreground">{sport.percentage}%</span>
            </div>
            <div className="relative">
              <Progress value={sport.percentage} className="h-2" />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full ${sport.color}`}
                style={{ width: `${sport.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
