import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface Category {
  name: string;
  percentage: number;
  color: string;
}

const categories: Category[] = [
  { name: "Comida", percentage: 35, color: "bg-chart-1" },
  { name: "Snacks", percentage: 28, color: "bg-chart-2" },
  { name: "Limpieza", percentage: 18, color: "bg-chart-3" },
  { name: "Bebidas", percentage: 12, color: "bg-chart-4" },
  { name: "Otros", percentage: 7, color: "bg-chart-5" },
];

export const CategoryChart = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorías</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((cat) => (
              <SelectItem
                key={cat.name.toLowerCase()}
                value={cat.name.toLowerCase()}
              >
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{category.name}</span>
                <span className="text-primary font-bold">
                  {category.percentage}%
                </span>
              </div>
              <Progress value={category.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
