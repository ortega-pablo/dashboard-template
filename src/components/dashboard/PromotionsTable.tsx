import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Promotion {
  id: number;
  rank: number;
  title: string;
  brand: string;
  country: string;
  type: string;
  category: string;
}

const mockPromotions: Promotion[] = [
  { id: 1, rank: 1, title: "Gana un viaje a París", brand: "Coca-Cola", country: "MX", type: "Transaccional", category: "Bebidas" },
  { id: 2, rank: 2, title: "Sorteo iPhone 15", brand: "Pepsi", country: "AR", type: "Engagement", category: "Bebidas" },
  { id: 3, rank: 3, title: "Colecciona y gana", brand: "Lay's", country: "BR", type: "Transaccional", category: "Snacks" },
];

export const PromotionsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Promos Pateado (Ranking)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Categoría</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPromotions.map((promo) => (
              <TableRow key={promo.id}>
                <TableCell className="font-bold">#{promo.rank}</TableCell>
                <TableCell className="font-medium">{promo.title}</TableCell>
                <TableCell>{promo.brand}</TableCell>
                <TableCell>
                  <Badge variant="outline">{promo.country}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={promo.type === "Transaccional" ? "default" : "secondary"}>
                    {promo.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{promo.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
