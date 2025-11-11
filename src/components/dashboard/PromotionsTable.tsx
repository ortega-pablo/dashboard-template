import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Promotion } from "@/data/promotions-mock-data";

interface PromotionsTableProps {
  promotions: Promotion[];
}

export function PromotionsTable({ promotions }: PromotionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calcular paginación
  const totalPages = Math.ceil(promotions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPromotions = promotions.slice(startIndex, endIndex);

  // Funciones de navegación
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Generar números de página para mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#004B93]">
        Promociones Filtradas ({promotions.length})
      </h2>

      {promotions.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          No hay promociones que coincidan con los filtros seleccionados
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">País</TableHead>
                  <TableHead className="font-semibold">Marca</TableHead>
                  <TableHead className="font-semibold">Tipo</TableHead>
                  <TableHead className="font-semibold">Mecánica</TableHead>
                  <TableHead className="font-semibold">Premio</TableHead>
                  <TableHead className="font-semibold">Relación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPromotions.map((promo) => (
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
                            ? "bg-[#004B93] hover:bg-[#003d7a]"
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
                    <TableCell>
                      <Badge
                        variant={
                          promo.relacionPepsico === "PEPSICO"
                            ? "default"
                            : promo.relacionPepsico === "COMPETENCIA DIRECTA"
                            ? "destructive"
                            : "secondary"
                        }
                        className={
                          promo.relacionPepsico === "PEPSICO"
                            ? "bg-[#004B93] hover:bg-[#003d7a]"
                            : promo.relacionPepsico === "COMPETENCIA DIRECTA"
                            ? "bg-[#E32119] hover:bg-[#c11d15]"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }
                      >
                        {promo.relacionPepsico}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Mostrando {startIndex + 1} -{" "}
                {Math.min(endIndex, promotions.length)} de {promotions.length}{" "}
                promociones
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <div className="flex gap-1">
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-1">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(page as number)}
                        className={
                          currentPage === page
                            ? "bg-[#004B93] hover:bg-[#003d7a]"
                            : ""
                        }
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-50"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
