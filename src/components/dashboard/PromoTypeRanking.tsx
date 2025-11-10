import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
import { useState } from "react";
import {
  mockPromotionsData,
  type PromoTypeRanking as PromoTypeRankingData,
} from "@/data/promotions-mock-data";

export const PromoTypeRanking = () => {
  const [promoType, setPromoType] = useState<"transaccional" | "engagement">(
    "transaccional"
  );
  const [selectedRanking, setSelectedRanking] =
    useState<PromoTypeRankingData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const currentPromos = mockPromotionsData[promoType];

  const handleRankingClick = (ranking: PromoTypeRankingData) => {
    setSelectedRanking(ranking);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Tipo de Promo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={promoType}
            onValueChange={(value) =>
              setPromoType(value as "transaccional" | "engagement")
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transaccional">Transaccional</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            {currentPromos.map((promo) => (
              <div
                key={promo.rank}
                onClick={() => handleRankingClick(promo)}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                  {promo.rank}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{promo.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {promo.brand}
                  </div>
                </div>
                <Badge
                  variant={
                    promoType === "transaccional" ? "default" : "secondary"
                  }
                >
                  {promoType}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedRanking?.title} - {selectedRanking?.brand}
            </DialogTitle>
          </DialogHeader>

          {selectedRanking && (
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>País</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Mecánica</TableHead>
                    <TableHead>Premio</TableHead>
                    <TableHead>Concepto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRanking.promotions.map((promotion) => (
                    <TableRow key={promotion.id}>
                      <TableCell className="font-medium">
                        {promotion.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{promotion.country}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {promotion.category}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{promotion.mechanic}</Badge>
                      </TableCell>
                      <TableCell>{promotion.prize}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {promotion.concept}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
