import { Promotion } from '@/data/promotions-mock-data';

/**
 * Interface para métricas de inspiración
 */
export interface InspirationMetrics {
  tipoInspiracion: string;
  totalPromociones: number;
  elementosInspiradores: {
    elemento: string;
    porcentaje: number;
    count: number;
  }[];
  mecanicaInspiradora: {
    mecanica: string;
    tasaExito: number;
    totalPromos: number;
  };
  premioQueAtrae: {
    premio: string;
    frecuencia: number;
    porcentaje: number;
  };
  tasaInspiracion: number;
  audienciaTarget: string;
  insight: string;
  icon: string;
}

/**
 * Calcula distribución de un campo en promociones
 */
export function calculateDistribution(
  promotions: Promotion[],
  field: keyof Promotion
): Record<string, number> {
  const distribution: Record<string, number> = {};

  promotions.forEach((p) => {
    if (field === 'concepto' || field === 'mecanica' || field === 'premio' || field === 'temporalidad' || field === 'pais' || field === 'tipoPromo' || field === 'clasificacion') {
      const value = String(p[field]);
      distribution[value] = (distribution[value] || 0) + 1;
    }
  });

  return distribution;
}

/**
 * Calcula la mecánica más exitosa
 */
export function calculateMostSuccessfulMechanic(promos: Promotion[]) {
  if (promos.length === 0) {
    return { mecanica: 'N/A', tasaExito: 0, totalPromos: 0 };
  }

  const mechanicSuccess: Record<string, { success: number; total: number }> = {};

  promos.forEach((p) => {
    if (!mechanicSuccess[p.mecanica]) {
      mechanicSuccess[p.mecanica] = { success: 0, total: 0 };
    }
    mechanicSuccess[p.mecanica].total++;
    if (p.promoExito) {
      mechanicSuccess[p.mecanica].success++;
    }
  });

  const mostSuccessful = Object.entries(mechanicSuccess)
    .map(([mecanica, { success, total }]) => ({
      mecanica,
      tasaExito: (success / total) * 100,
      totalPromos: total,
    }))
    .sort((a, b) => b.tasaExito - a.tasaExito)[0];

  return mostSuccessful || { mecanica: 'N/A', tasaExito: 0, totalPromos: 0 };
}

/**
 * Obtiene el premio más frecuente
 */
export function getMostFrequentPrize(promos: Promotion[]) {
  if (promos.length === 0) {
    return { premio: 'N/A', frecuencia: 0, porcentaje: 0 };
  }

  const premios = calculateDistribution(promos, 'premio');
  const mostFrequent = Object.entries(premios)
    .sort(([, a], [, b]) => b - a)[0];

  return {
    premio: mostFrequent?.[0] || 'N/A',
    frecuencia: mostFrequent?.[1] || 0,
    porcentaje: mostFrequent ? ((mostFrequent[1] / promos.length) * 100) : 0,
  };
}

/**
 * Genera el insight de inspiración basado en datos
 */
export function generateInspirationInsight(
  tipoInspiracion: string,
  promos: Promotion[],
  mecanicaExitosa: { mecanica: string; tasaExito: number; totalPromos: number },
  tasaInspiracion: number
): string {
  const totalPromos = promos.length;
  const exitosasCount = promos.filter((p) => p.promoExito).length;

  if (totalPromos === 0) {
    return 'Sin datos disponibles para este tipo de inspiración.';
  }

  switch (tipoInspiracion) {
    case 'celebrity':
      return `Las celebridades generan inspiración en ${tasaInspiracion.toFixed(0)}% de casos. Mecánica más efectiva: ${mecanicaExitosa.mecanica} (${mecanicaExitosa.tasaExito.toFixed(0)}% éxito). ${exitosasCount} de ${totalPromos} promociones fueron exitosas.`;

    case 'sports':
      return `Eventos deportivos inspiran a ${exitosasCount} de ${totalPromos} consumidores (${tasaInspiracion.toFixed(0)}%). ${mecanicaExitosa.mecanica} es la mecánica ganadora. Potencial para expandir cobertura deportiva.`;

    case 'experience':
      return `Experiencias (viajes, eventos) generan inspiración superior (${tasaInspiracion.toFixed(0)}%). ${mecanicaExitosa.mecanica} es el método más exitoso. Recomendación: Potenciar este tipo de ofertas.`;

    case 'value':
      return `Descuentos/valor inspiran a ${totalPromos} usuarios (${tasaInspiracion.toFixed(0)}% éxito). ${mecanicaExitosa.mecanica} funciona mejor. Oportunidad: Combinar con experiencias para aumentar atracción.`;

    case 'mixed':
      return `Estrategia integrada obtiene ${tasaInspiracion.toFixed(0)}% de inspiración. Combinación de múltiples elementos supera enfoques simples. ${mecanicaExitosa.mecanica} es el mejor método de activación.`;

    default:
      return `Esta estrategia inspiró a ${tasaInspiracion.toFixed(0)}% de participantes. ${mecanicaExitosa.mecanica} generó el mayor engagement.`;
  }
}

/**
 * Determina la audiencia target
 */
export function determineTargetAudience(tipoInspiracion: string): string {
  switch (tipoInspiracion) {
    case 'celebrity':
      return 'Fans de personalidades públicas';
    case 'sports':
      return 'Aficionados deportivos';
    case 'experience':
      return 'Buscadores de vivencias';
    case 'value':
      return 'Consumidores pragmáticos';
    case 'mixed':
      return 'Audiencia diversa';
    default:
      return 'Consumidor general';
  }
}

/**
 * Obtiene el ícono para cada tipo de inspiración
 */
export function getInspirationIcon(tipo: string): string {
  switch (tipo) {
    case 'celebrity':
      return '⭐';
    case 'sports':
      return '⚽';
    case 'experience':
      return '✈️';
    case 'value':
      return '💰';
    case 'mixed':
      return '🎯';
    default:
      return '💡';
  }
}

/**
 * Agrupa promociones por tipo de inspiración
 */
function groupPromotionsByInspirationTypes(promotions: Promotion[]): Record<string, Promotion[]> {
  const celebrity = promotions.filter((p) => p.concepto === 'CELEBRITIES');

  const sports = promotions.filter((p) => p.concepto === 'DEPORTES');

  const experience = promotions.filter((p) =>
    p.premio === 'Viajes' ||
    p.premio === 'Entradas a conciertos / eventos deportivos' ||
    p.premio === 'Estadías en lugares turísticos'
  );

  const value = promotions.filter((p) => p.clasificacion === 'VALUE');

  // Mixed: tiene tanto celebrity como sports
  const mixed = promotions.filter((p) => {
    const hasCelebrity = p.concepto === 'CELEBRITIES';
    const hasSports = p.f1 || p.mundial || p.nfl || p.uefaChampionsLeague;
    return hasCelebrity && hasSports;
  });

  return {
    celebrity,
    sports,
    experience,
    value,
    mixed,
  };
}

/**
 * Función principal: Calcula todas las métricas de inspiración
 */
export function calculateInspirationMetrics(
  promotions: Promotion[]
): InspirationMetrics[] {
  if (promotions.length === 0) {
    return [];
  }

  const groupedByInspiration = groupPromotionsByInspirationTypes(promotions);

  const inspirationTypes = Object.entries(groupedByInspiration)
    .map(([tipo, promos]) => {
      if (promos.length === 0) {
        return null;
      }

      // Elementos que generan inspiración
      const conceptosDistribution = calculateDistribution(promos, 'concepto');
      const mecanicasDistribution = calculateDistribution(promos, 'mecanica');

      // Mecánica más inspiradora (más exitosa)
      const mecanicaExitosa = calculateMostSuccessfulMechanic(promos);

      // Premio más inspirador
      const premioMasAtractivo = getMostFrequentPrize(promos);

      // Tasa de éxito (cuánto inspira realmente)
      const tasaInspiracion = (promos.filter((p) => p.promoExito).length / promos.length) * 100;

      // Generar insight
      const insight = generateInspirationInsight(
        tipo,
        promos,
        mecanicaExitosa,
        tasaInspiracion
      );

      return {
        tipoInspiracion: tipo,
        totalPromociones: promos.length,
        elementosInspiradores: Object.entries(conceptosDistribution)
          .map(([elem, count]) => ({
            elemento: elem,
            porcentaje: (count / promos.length) * 100,
            count,
          }))
          .sort((a, b) => b.porcentaje - a.porcentaje),
        mecanicaInspiradora: mecanicaExitosa,
        premioQueAtrae: premioMasAtractivo,
        tasaInspiracion,
        audienciaTarget: determineTargetAudience(tipo),
        insight,
        icon: getInspirationIcon(tipo),
      };
    })
    .filter((m) => m !== null) as InspirationMetrics[];

  // Retornar ordenado por tasa de inspiración
  return inspirationTypes.sort((a, b) => b.tasaInspiracion - a.tasaInspiracion).slice(0, 5);
}