import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Promotion } from "@/data/promotions-mock-data";

interface MechanicsAndPrizesProps {
  promotions: Promotion[];
}

export function MechanicsAndPrizes({ promotions }: MechanicsAndPrizesProps) {
  // Contar mecánicas
  const mechanicsCounts = promotions.reduce((acc, promo) => {
    const mecanica = promo.mecanica;
    acc[mecanica] = (acc[mecanica] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Contar premios
  const prizesCounts = promotions.reduce((acc, promo) => {
    const premio = promo.premio;
    acc[premio] = (acc[premio] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Ordenar y obtener top 5
  const topMechanics = Object.entries(mechanicsCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topPrizes = Object.entries(prizesCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Función para acortar texto largo
  const shortenText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Mecánicas y Premios Más Utilizados
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Top Mecánicas */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-8 bg-blue-600 rounded"></div>
            <h3 className="text-lg font-semibold text-slate-700">
              Top 5 Mecánicas
            </h3>
          </div>
          <div className="space-y-3">
            {topMechanics.map(([mecanica, count], index) => {
              const percentage =
                promotions.length > 0 ? (count / promotions.length) * 100 : 0;
              return (
                <div key={mecanica} className="group">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors"
                          title={mecanica}
                        >
                          {shortenText(mecanica)}
                        </p>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <Badge variant="secondary" className="text-xs/">
                            {count}
                          </Badge>
                          <span className="text-sm font-semibold text-blue-600">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Premios */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-8 bg-destructive rounded"></div>
            <h3 className="text-lg font-semibold text-slate-700">
              Top 5 Premios
            </h3>
          </div>
          <div className="space-y-3">
            {topPrizes.map(([premio, count], index) => {
              const percentage =
                promotions.length > 0 ? (count / promotions.length) * 100 : 0;
              return (
                <div key={premio} className="group">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive-foreground flex items-center justify-center">
                      <span className="text-sm font-bold text-destructive">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className="text-sm font-medium text-slate-700 group-hover:text-destructive transition-colors"
                          title={premio}
                        >
                          {shortenText(premio)}
                        </p>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <Badge variant="secondary" className="text-xs">
                            {count}
                          </Badge>
                          <span className="text-sm font-semibold text-destructive">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-destructive h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Insights adicionales */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {Object.keys(mechanicsCounts).length}
            </div>
            <div className="text-xs text-slate-600">Mecánicas únicas</div>
          </div>
          <div className="text-center p-3 bg-destructive-foreground rounded-lg">
            <div className="text-2xl font-bold text-destructive">
              {Object.keys(prizesCounts).length}
            </div>
            <div className="text-xs text-slate-600">Premios únicos</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {topMechanics.length > 0 ? topMechanics[0][1] : 0}
            </div>
            <div className="text-xs text-slate-600">Mecánica más popular</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {topPrizes.length > 0 ? topPrizes[0][1] : 0}
            </div>
            <div className="text-xs text-slate-600">Premio más ofrecido</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
