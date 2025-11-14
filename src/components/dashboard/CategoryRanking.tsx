import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Promotion } from "@/data/promotions-mock-data";

interface CategoryRankingProps {
  promotions: Promotion[];
}

export function CategoryRanking({ promotions }: CategoryRankingProps) {
  // Obtener todas las categorías únicas y contar promotiones por categoría
  const categoryStats = promotions.reduce((acc, promotion) => {
    if (!acc[promotion.categoria]) {
      acc[promotion.categoria] = 0;
    }
    acc[promotion.categoria]++;
    return acc;
  }, {} as Record<string, number>);

  // Convertir a array y ordenar por cantidad descendente
  const sortedCategories = Object.entries(categoryStats)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([category, count]) => ({ category, count }));

  const total = promotions.length;

  // Colores para las categorías
  const colors = [{ bg:"bg-blue-500" ,badge: "border-blue-500 text-blue-500", text: "text-blue-500" }];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Ranking de Categorías</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {sortedCategories.map((item, index) => {
          const percentage = total > 0 ? (item.count / total) * 100 : 0;
          const colorScheme = colors[index % colors.length];

          return (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${colorScheme.badge}`}
                  >
                    {item.category}
                  </Badge>
                  <span className="text-sm text-slate-600">
                    {item.count} promos
                  </span>
                </div>
                <span className={`text-lg font-bold ${colorScheme.text}`}>
                  {percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className={`${colorScheme.bg} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen Total */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-700">
            Total de Promociones
          </span>
          <span className="text-3xl font-bold text-blue-600">{total}</span>
        </div>
      </div>
    </Card>
  );
}
