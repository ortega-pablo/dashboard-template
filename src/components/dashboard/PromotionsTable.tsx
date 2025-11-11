import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Promotion } from "@/data/promotions-mock-data";

interface PromotionsTableProps {
  promotions: Promotion[];
}

export function PromotionsTable({ promotions }: PromotionsTableProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Promociones Filtradas ({promotions.length})
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>País</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Clasificación</TableHead>
              <TableHead>Mecánica</TableHead>
              <TableHead>Premio</TableHead>
              <TableHead>Relación PepsiCo</TableHead>
              <TableHead>Deportes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.slice(0, 50).map((promo) => (
              <TableRow key={promo.id}>
                <TableCell className="font-medium">
                  {promo.pais === "BRASIL" && "🇧🇷"}
                  {promo.pais === "CHILE" && "🇨🇱"}
                  {promo.pais === "GUATEMALA" && "🇬🇹"}
                  {promo.pais === "MEXICO" && "🇲🇽"}
                  {promo.pais === "COLOMBIA" && "🇨🇴"} {promo.pais}
                </TableCell>
                <TableCell className="font-semibold">{promo.marca}</TableCell>
                <TableCell className="text-sm max-w-xs truncate">
                  {promo.categoria}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      promo.tipoPromo === "TRANSACCIONAL"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {promo.tipoPromo}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{promo.clasificacion}</Badge>
                </TableCell>
                <TableCell className="text-sm max-w-md truncate">
                  {promo.mecanica}
                </TableCell>
                <TableCell className="text-sm max-w-md truncate">
                  {promo.premio}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      promo.relacionPepsico === "PEPSICO"
                        ? "default"
                        : promo.relacionPepsico === "COMPETENCIA DIRECTA"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {promo.relacionPepsico}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {promo.f1 && <span title="F1">🏎️</span>}
                    {promo.mundial && <span title="Mundial">⚽</span>}
                    {promo.nfl && <span title="NFL">🏈</span>}
                    {promo.uefaChampionsLeague && <span title="UEFA">🏆</span>}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {promotions.length > 50 && (
          <div className="mt-4 text-center text-sm text-slate-600">
            Mostrando 50 de {promotions.length} promociones. Descarga el CSV
            para ver todas.
          </div>
        )}
      </div>
    </Card>
  );
}
