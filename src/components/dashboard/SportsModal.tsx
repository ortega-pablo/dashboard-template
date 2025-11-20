import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Promotion } from "@/data/promotions-mock-data";

interface SportsModalProps {
  deporte: {
    id: string;
    nombre: string;
    icon: string;
  };
  promotions: Promotion[];
  count: number;
}

export function SportsModal({ deporte, promotions, count }: SportsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Filtrar promociones del deporte específico
  const sportsPromotions = promotions.filter((p) => {
    if (deporte.id === "f1") return p.f1;
    if (deporte.id === "mundial") return p.mundial;
    if (deporte.id === "nfl") return p.nfl;
    if (deporte.id === "uefa") return p.uefaChampionsLeague;
    return false;
  });

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="w-full gap-2 mt-2"
        onClick={() => setIsOpen(true)}
      >
        <Eye className="w-4 h-4" />
        Ver detalles
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {deporte.icon} {deporte.nombre} - Promociones ({count})
            </DialogTitle>
          </DialogHeader>

          {sportsPromotions.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No hay promociones asociadas a este deporte
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-slate-600">
                Mostrando {sportsPromotions.length} promoción/es
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold">País</TableHead>
                      <TableHead className="font-semibold">Marca</TableHead>
                      <TableHead className="font-semibold">Tipo</TableHead>
                      <TableHead className="font-semibold">Mecánica</TableHead>
                      <TableHead className="font-semibold">Premio</TableHead>
                      <TableHead className="font-semibold">Categoría</TableHead>
                      <TableHead className="font-semibold">Relación</TableHead>
                      <TableHead className="font-semibold">Éxito</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sportsPromotions.map((promo) => (
                      <TableRow key={promo.id} className="hover:bg-slate-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">
                              {promo.pais === "BRASIL" && "🇧🇷"}
                              {promo.pais === "CHILE" && "🇨🇱"}
                              {promo.pais === "GUATEMALA" && "🇬🇹"}
                              {promo.pais === "MEXICO" && "🇲🇽"}
                              {promo.pais === "COLOMBIA" && "🇨🇴"}
                            </span>
                            <span className="text-sm">{promo.pais}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {promo.marca}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              promo.tipoPromo === "TRANSACCIONAL"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              promo.tipoPromo === "TRANSACCIONAL"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                            }
                          >
                            {promo.tipoPromo}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className="text-sm max-w-xs truncate"
                          title={promo.mecanica}
                        >
                          {promo.mecanica}
                        </TableCell>
                        <TableCell
                          className="text-sm max-w-xs truncate"
                          title={promo.premio}
                        >
                          {promo.premio}
                        </TableCell>
                        <TableCell
                          className="text-sm max-w-xs truncate"
                          title={promo.categoria}
                        >
                          {promo.categoria}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              promo.relacionPepsico === "PEPSICO"
                                ? "default"
                                : promo.relacionPepsico ===
                                  "COMPETENCIA DIRECTA"
                                ? "destructive"
                                : "secondary"
                            }
                            className={
                              promo.relacionPepsico === "PEPSICO"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : promo.relacionPepsico ===
                                  "COMPETENCIA DIRECTA"
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                            }
                          >
                            {promo.relacionPepsico}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={promo.promoExito ? "default" : "outline"}
                            className={
                              promo.promoExito
                                ? "bg-green-600 hover:bg-green-700"
                                : "border-slate-300"
                            }
                          >
                            {promo.promoExito ? "✓ Sí" : "✗ No"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
