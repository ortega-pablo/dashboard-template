import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState, useMemo } from "react";
import {
  mockPromotionsData,
  type Promotion,
} from "@/data/promotions-mock-data";

interface Country {
  code: string;
  name: string;
  count: number;
  flag: string;
}

interface CountryFlagsProps {
  onCountrySelect: (country: string) => void;
}

export const CountryFlags = ({ onCountrySelect }: CountryFlagsProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("LATAM");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get all promotions from mock data
  const allPromotions = useMemo(() => {
    const transaccionalPromos = mockPromotionsData.transaccional.flatMap(
      (ranking) => ranking.promotions
    );
    const engagementPromos = mockPromotionsData.engagement.flatMap(
      (ranking) => ranking.promotions
    );
    return [...transaccionalPromos, ...engagementPromos];
  }, []);

  // Calculate promotions count by country
  const countriesWithCounts = useMemo(() => {
    const countries = [
      { code: "MX", name: "México", flag: "🇲🇽" },
      { code: "BR", name: "Brasil", flag: "🇧🇷" },
      { code: "AR", name: "Argentina", flag: "🇦🇷" },
      { code: "CO", name: "Colombia", flag: "🇨🇴" },
      { code: "CL", name: "Chile", flag: "🇨🇱" },
    ];

    return countries.map((country) => ({
      ...country,
      count: allPromotions.filter((promo) => promo.country === country.code)
        .length,
    }));
  }, [allPromotions]);

  const totalPromos = allPromotions.length;

  // Get promotions for selected country
  const selectedPromotions = useMemo(() => {
    if (selectedCountry === "LATAM") {
      return allPromotions;
    }
    return allPromotions.filter((promo) => promo.country === selectedCountry);
  }, [selectedCountry, allPromotions]);

  const handleCountryClick = (code: string) => {
    setSelectedCountry(code);
    onCountrySelect(code);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Promociones Detectadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {totalPromos}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Promociones
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {countriesWithCounts.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountryClick(country.code)}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:border-primary cursor-pointer ${
                    selectedCountry === country.code
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  }`}
                >
                  <div className="text-3xl mb-1">{country.flag}</div>
                  <div className="text-xs font-medium">{country.code}</div>
                  <div className="text-lg font-bold text-primary">
                    {country.count}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleCountryClick("LATAM")}
              className={`w-full p-3 rounded-lg border-2 transition-all hover:border-primary ${
                selectedCountry === "LATAM"
                  ? "border-primary bg-primary/10"
                  : "border-border"
              }`}
            >
              <div className="text-sm font-medium">LATAM</div>
              <div className="text-2xl font-bold text-primary">
                {totalPromos}
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Promociones -{" "}
              {selectedCountry === "LATAM"
                ? "LATAM (Todas)"
                : countriesWithCounts.find((c) => c.code === selectedCountry)
                    ?.name}
            </DialogTitle>
            <div className="text-sm text-muted-foreground">
              Total: {selectedPromotions.length} promociones
            </div>
          </DialogHeader>

          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>País</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Mecánica</TableHead>
                  <TableHead>Premio</TableHead>
                  <TableHead>Concepto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedPromotions.map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell className="font-medium">
                      {promotion.title}
                    </TableCell>
                    <TableCell>{promotion.brand}</TableCell>
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
        </DialogContent>
      </Dialog>
    </>
  );
};
