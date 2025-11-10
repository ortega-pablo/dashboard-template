import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { mockPromotionsData, Promotion } from "@/data/promotions-mock-data";

interface InspirationPromo {
  id: number;
  title: string;
  brand: string;
  category: string;
  concept: string;
}

// Generamos una lista de inspiración a partir del mock existente.
// No modificamos el mock original — solo lo usamos para construir una vista reducida.
const buildInspirationPromos = (): InspirationPromo[] => {
  // Extraer todas las promociones de las secciones transaccional y engagement
  const allPromotions: Promotion[] = [];

  mockPromotionsData.transaccional.forEach((group) => {
    allPromotions.push(...group.promotions);
  });
  mockPromotionsData.engagement.forEach((group) => {
    allPromotions.push(...group.promotions);
  });

  // Deduplicar por id y mapear a la forma que usa el componente.
  const seen = new Set<number>();
  const mapped: InspirationPromo[] = [];

  for (const p of allPromotions) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    mapped.push({
      id: p.id,
      title: p.title,
      brand: p.brand,
      category: p.category,
      concept: p.concept,
    });
    // Limitar la lista a un número razonable para la sección de inspiración
    if (mapped.length >= 6) break;
  }

  // Si por alguna razón no hay promos, incluir un fallback mínimo (no tocar el mock)
  if (mapped.length === 0) {
    return [
      { id: 9999, title: "Promo de ejemplo", brand: "Marca", category: "Categoría", concept: "General" },
    ];
  }

  return mapped;
};

export const InspirationSection = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const inspirationPromos = useMemo(() => buildInspirationPromos(), []);

  const filteredPromos = useMemo(() => {
    if (selectedFilter === "all") return inspirationPromos;
    return inspirationPromos.filter((promo) => {
      // Normalizar acentos y comparar en minúsculas usando el rango de marcas combinantes Unicode
      const normalized = promo.concept.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      // Si algo falla, también comprobamos sin normalizar
      const normSafe = promo.concept.toLowerCase().replace(/[\u0300-\u036f]/g, "");
      return normalized === selectedFilter || normSafe === selectedFilter;
    });
  }, [inspirationPromos, selectedFilter]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promos de Inspiración</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por concepto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="deportes">Deportes</SelectItem>
            <SelectItem value="musica">Música</SelectItem>
            <SelectItem value="celebridades">Celebridades</SelectItem>
          </SelectContent>
        </Select>

        <div className="space-y-4">
          {filteredPromos.map((promo) => (
            <div
              key={promo.id}
              className="p-4 rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all"
            >
              <h3 className="font-semibold text-lg mb-2">{promo.title}</h3>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">{promo.brand}</Badge>
                <Badge variant="secondary">{promo.category}</Badge>
                <Badge className="bg-chart-3">{promo.concept}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
