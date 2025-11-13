import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Promotion } from "@/data/promotions-mock-data";
import {
  calculateInspirationMetrics,
  InspirationMetrics,
} from "@/components/dashboard/InspirationAnalysis";

interface InspirationSectionProps {
  promotions: Promotion[];
}

export function InspirationSection({ promotions }: InspirationSectionProps) {
  const inspirationMetrics = useMemo(() => {
    return calculateInspirationMetrics(promotions);
  }, [promotions]);

  if (!inspirationMetrics.length) {
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Análisis de Inspiración</h2>
        <p className="text-slate-600">
          No hay datos suficientes para análisis de inspiración en los filtros
          seleccionados.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Análisis de Inspiración en Consumidores
      </h2>
      <p className="text-sm text-slate-600 mb-6">
        Análisis dinámico de qué elementos de las promociones generan mayor
        inspiración y engagement.
      </p>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${inspirationMetrics.length === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-5' } gap-4`}>
        {inspirationMetrics.map((metric) => (
          <InspirationCard key={metric.tipoInspiracion} metric={metric} />
        ))}
      </div>
    </Card>
  );
}

/**
 * Card individual con métricas de inspiración
 */
function InspirationCard({ metric }: { metric: InspirationMetrics }) {
  const getColorByInspiration = (tipo: string): string => {
    switch (tipo) {
      case "celebrity":
        return "bg-purple-50 border-purple-200 hover:border-purple-400";
      case "sports":
        return "bg-blue-50 border-blue-200 hover:border-blue-400";
      case "experience":
        return "bg-green-50 border-green-200 hover:border-green-400";
      case "value":
        return "bg-orange-50 border-orange-200 hover:border-orange-400";
      case "mixed":
        return "bg-pink-50 border-pink-200 hover:border-pink-400";
      default:
        return "bg-slate-50 border-slate-200 hover:border-slate-400";
    }
  };

  const getBadgeVariant = (
    tipo: string
  ): "default" | "destructive" | "secondary" | "outline" => {
    switch (tipo) {
      case "celebrity":
        return "default";
      case "sports":
        return "default";
      case "experience":
        return "default";
      case "value":
        return "destructive";
      case "mixed":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border p-4 transition-all duration-300 ${getColorByInspiration(
        metric.tipoInspiracion
      )}`}
    >
      {/* Header con ícono y tipo */}
      <div className="mb-3">
        <div className="text-3xl mb-2">{metric.icon}</div>
        <h3 className="font-bold text-sm uppercase text-slate-900">
          {metric.tipoInspiracion}
        </h3>
        <Badge
          variant={getBadgeVariant(metric.tipoInspiracion)}
          className="mt-2"
        >
          {metric.tasaInspiracion.toFixed(0)}% inspiración
        </Badge>
      </div>

      {/* Métricas principales */}
      <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
        <p className="text-xs text-slate-600">
          <span className="font-semibold">Promociones:</span>{" "}
          {metric.totalPromociones}
        </p>
        <p className="text-xs text-slate-600">
          <span className="font-semibold">Target:</span>{" "}
          {metric.audienciaTarget}
        </p>
      </div>

      {/* Elementos inspiradores */}
      <div className="mb-4">
        <p className="text-xs font-semibold mb-2 text-slate-700">
          Elementos clave:
        </p>
        <div className="space-y-1">
          {metric.elementosInspiradores.slice(0, 2).map((elem) => (
            <p key={elem.elemento} className="text-xs text-slate-600">
              ✓ {elem.elemento}:{" "}
              <span className="font-semibold">
                {elem.porcentaje.toFixed(0)}%
              </span>
            </p>
          ))}
        </div>
      </div>

      {/* Mecánica ganadora */}
      <div className="mb-4 pb-4 border-b border-slate-200">
        <p className="text-xs font-semibold mb-1 text-slate-700">
          Mecánica ganadora:
        </p>
        <div className="bg-white bg-opacity-60 p-2 rounded text-xs">
          <p className="font-semibold text-slate-900">
            {metric.mecanicaInspiradora.mecanica}
          </p>
          <p className="text-slate-600">
            {metric.mecanicaInspiradora.tasaExito.toFixed(0)}% de éxito
          </p>
        </div>
      </div>

      {/* Premio que atrae */}
      <div className="mb-4 pb-4 border-b border-slate-200">
        <p className="text-xs font-semibold mb-1 text-slate-700">
          Premio que atrae:
        </p>
        <p className="text-xs text-slate-900 font-semibold">
          {metric.premioQueAtrae.premio}
        </p>
        <p className="text-xs text-slate-600">
          {metric.premioQueAtrae.porcentaje.toFixed(0)}% de preferencia
        </p>
      </div>

      {/* Insight */}
      <div className="mb-3 p-3 bg-white bg-opacity-70 rounded-lg">
        <p className="text-xs text-slate-700 leading-relaxed">
          <span className="font-semibold text-slate-900">💡 Insight:</span>{" "}
          {metric.insight}
        </p>
      </div>

      {/* Footer: Recomendación */}
      <div className="pt-2 border-t border-slate-200">
        <p className="text-xs italic text-slate-600">
          {getRecommendation(metric.tipoInspiracion, metric.tasaInspiracion)}
        </p>
      </div>
    </div>
  );
}

/**
 * Genera recomendación basada en tipo e inspiración
 */
function getRecommendation(
  tipoInspiracion: string,
  tasaInspiracion: number
): string {
  if (tasaInspiracion > 75) {
    return "✅ Alto potencial. Escalar esta estrategia.";
  } else if (tasaInspiracion > 60) {
    return "⚠️ Potencial moderado. Considerar optimizaciones.";
  } else {
    return "📌 Bajo rendimiento. Evaluar combinaciones.";
  }
}
