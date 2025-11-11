import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Promotion } from "@/data/promotions-mock-data";

interface PromoTypeRankingProps {
  promotions: Promotion[];
}

export function PromoTypeRanking({ promotions }: PromoTypeRankingProps) {
  // Calcular estadísticas de tipos de promo
  const transaccional = promotions.filter(
    (p) => p.tipoPromo === "TRANSACCIONAL"
  ).length;
  const engagement = promotions.filter(
    (p) => p.tipoPromo === "ENGAGEMENT"
  ).length;
  const total = promotions.length;

  const transaccionalPercentage = total > 0 ? (transaccional / total) * 100 : 0;
  const engagementPercentage = total > 0 ? (engagement / total) * 100 : 0;

  // Calcular estadísticas de clasificación
  const value = promotions.filter((p) => p.clasificacion === "VALUE").length;
  const equity = promotions.filter((p) => p.clasificacion === "EQUITY").length;
  const license = promotions.filter(
    (p) => p.clasificacion === "LICENSE"
  ).length;

  const valuePercentage = total > 0 ? (value / total) * 100 : 0;
  const equityPercentage = total > 0 ? (equity / total) * 100 : 0;
  const licensePercentage = total > 0 ? (license / total) * 100 : 0;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Ranking de Tipos de Promoción</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tipo de Promo */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-700">
            Por Tipo de Promo
          </h3>
          <div className="space-y-4">
            {/* TRANSACCIONAL */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-blue-600">
                    TRANSACCIONAL
                  </Badge>
                  <span className="text-sm text-slate-600">
                    {transaccional} promos
                  </span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {transaccionalPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${transaccionalPercentage}%` }}
                />
              </div>
            </div>

            {/* ENGAGEMENT */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">ENGAGEMENT</Badge>
                  <span className="text-sm text-slate-600">
                    {engagement} promos
                  </span>
                </div>
                <span className="text-lg font-bold text-slate-600">
                  {engagementPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-slate-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${engagementPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Clasificación */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-700">
            Por Clasificación
          </h3>
          <div className="space-y-4">
            {/* VALUE */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-green-600 text-green-600"
                  >
                    VALUE
                  </Badge>
                  <span className="text-sm text-slate-600">{value} promos</span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  {valuePercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${valuePercentage}%` }}
                />
              </div>
            </div>

            {/* EQUITY */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-purple-600 text-purple-600"
                  >
                    EQUITY
                  </Badge>
                  <span className="text-sm text-slate-600">
                    {equity} promos
                  </span>
                </div>
                <span className="text-lg font-bold text-purple-600">
                  {equityPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${equityPercentage}%` }}
                />
              </div>
            </div>

            {/* LICENSE */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-orange-600 text-orange-600"
                  >
                    LICENSE
                  </Badge>
                  <span className="text-sm text-slate-600">
                    {license} promos
                  </span>
                </div>
                <span className="text-lg font-bold text-orange-600">
                  {licensePercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-orange-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${licensePercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
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
