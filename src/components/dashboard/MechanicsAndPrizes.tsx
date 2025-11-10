import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useState, useMemo } from "react";
import {
  mockPromotionsData,
  type Promotion,
} from "@/data/promotions-mock-data";

interface MechanicRanking {
  rank: number;
  title: string;
  brand: string;
  count: number;
  promotions: Promotion[];
}

interface PrizeRanking {
  rank: number;
  name: string;
  count: number;
  promotions: Promotion[];
}

export const MechanicsAndPrizes = () => {
  const [selectedMechanic, setSelectedMechanic] = useState<string>("all");
  const [selectedPrize, setSelectedPrize] = useState<string>("all");
  const [selectedMechanicRanking, setSelectedMechanicRanking] =
    useState<MechanicRanking | null>(null);
  const [selectedPrizeRanking, setSelectedPrizeRanking] =
    useState<PrizeRanking | null>(null);
  const [selectedPromotions, setSelectedPromotions] = useState<Promotion[]>([]);
  const [isMechanicDialogOpen, setIsMechanicDialogOpen] = useState(false);
  const [isPrizeDialogOpen, setIsPrizeDialogOpen] = useState(false);
  const [mechanicViewAllOpen, setMechanicViewAllOpen] = useState(false);
  const [prizeViewAllOpen, setPrizeViewAllOpen] = useState(false);

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

  // Calculate mechanics rankings
  const mechanicsRankings = useMemo(() => {
    const mechanicsMap: { [key: string]: MechanicRanking } = {};

    allPromotions.forEach((promo) => {
      const mechanicKey = promo.mechanic.toLowerCase();

      if (!mechanicsMap[mechanicKey]) {
        mechanicsMap[mechanicKey] = {
          rank: 0,
          title: promo.mechanic,
          brand: promo.brand,
          count: 0,
          promotions: [],
        };
      }

      mechanicsMap[mechanicKey].count++;
      mechanicsMap[mechanicKey].promotions.push(promo);
    });

    // Convert to array and sort by count
    const rankings = Object.values(mechanicsMap)
      .sort((a, b) => b.count - a.count)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));

    return rankings;
  }, [allPromotions]);

  // Calculate prizes rankings
  const prizesRankings = useMemo(() => {
    const prizesMap: { [key: string]: PrizeRanking } = {};

    allPromotions.forEach((promo) => {
      const prizeKey = promo.prize.toLowerCase();

      if (!prizesMap[prizeKey]) {
        prizesMap[prizeKey] = {
          rank: 0,
          name: promo.prize,
          count: 0,
          promotions: [],
        };
      }

      prizesMap[prizeKey].count++;
      prizesMap[prizeKey].promotions.push(promo);
    });

    // Convert to array and sort by count
    const rankings = Object.values(prizesMap)
      .sort((a, b) => b.count - a.count)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));

    return rankings;
  }, [allPromotions]);

  // Get available mechanics for select
  const availableMechanics = useMemo(() => {
    return mechanicsRankings.map((m) => ({
      value: m.title.toLowerCase(),
      label: m.title,
    }));
  }, [mechanicsRankings]);

  // Get available prizes for select
  const availablePrizes = useMemo(() => {
    return prizesRankings.map((p) => ({
      value: p.name.toLowerCase(),
      label: p.name,
    }));
  }, [prizesRankings]);

  // Get promotions for selected mechanic
  const mechanicPromotions = useMemo(() => {
    if (selectedMechanic === "all") return [];
    const ranking = mechanicsRankings.find(
      (m) => m.title.toLowerCase() === selectedMechanic
    );
    return ranking?.promotions || [];
  }, [selectedMechanic, mechanicsRankings]);

  // Get promotions for selected prize
  const prizePromotions = useMemo(() => {
    if (selectedPrize === "all") return [];
    const ranking = prizesRankings.find(
      (p) => p.name.toLowerCase() === selectedPrize
    );
    return ranking?.promotions || [];
  }, [selectedPrize, prizesRankings]);

  const handleMechanicRankingClick = (ranking: MechanicRanking) => {
    setSelectedMechanicRanking(ranking);
    setIsMechanicDialogOpen(true);
  };

  const handlePrizeRankingClick = (ranking: PrizeRanking) => {
    setSelectedPrizeRanking(ranking);
    setIsPrizeDialogOpen(true);
  };

  const handleMechanicViewAll = () => {
    setSelectedPromotions(mechanicPromotions);
    setMechanicViewAllOpen(true);
  };

  const handlePrizeViewAll = () => {
    setSelectedPromotions(prizePromotions);
    setPrizeViewAllOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mechanics Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mecánicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              value={selectedMechanic}
              onValueChange={setSelectedMechanic}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {availableMechanics.map((mech) => (
                  <SelectItem key={mech.value} value={mech.value}>
                    {mech.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedMechanic === "all" ? (
              // Show mechanic rankings when "all" is selected
              <div className="space-y-2">
                {mechanicsRankings.map((mechanic) => (
                  <div
                    key={mechanic.title}
                    onClick={() => handleMechanicRankingClick(mechanic)}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {mechanic.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{mechanic.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {mechanic.count} promociones
                      </div>
                    </div>
                    <Badge variant="secondary">{mechanic.count}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              // Show individual promotions ranking when specific mechanic is selected
              <div className="space-y-2">
                {mechanicPromotions.slice(0, 5).map((promo, index) => (
                  <div
                    key={promo.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{promo.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {promo.brand}
                      </div>
                    </div>
                    <Badge variant="outline">{promo.country}</Badge>
                  </div>
                ))}
                {mechanicPromotions.length > 5 && (
                  <Button
                    onClick={handleMechanicViewAll}
                    variant="outline"
                    className="w-full"
                  >
                    Ver todas ({mechanicPromotions.length})
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prizes Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Premios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedPrize} onValueChange={setSelectedPrize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {availablePrizes.map((prize) => (
                  <SelectItem key={prize.value} value={prize.value}>
                    {prize.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedPrize === "all" ? (
              // Show prize rankings when "all" is selected
              <div className="space-y-2">
                {prizesRankings.map((prize) => (
                  <div
                    key={prize.name}
                    onClick={() => handlePrizeRankingClick(prize)}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {prize.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{prize.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {prize.count} promociones
                      </div>
                    </div>
                    <Badge variant="secondary">{prize.count}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              // Show individual promotions ranking when specific prize is selected
              <div className="space-y-2">
                {prizePromotions.slice(0, 5).map((promo, index) => (
                  <div
                    key={promo.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{promo.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {promo.brand}
                      </div>
                    </div>
                    <Badge variant="outline">{promo.country}</Badge>
                  </div>
                ))}
                {prizePromotions.length > 5 && (
                  <Button
                    onClick={handlePrizeViewAll}
                    variant="outline"
                    className="w-full"
                  >
                    Ver todas ({prizePromotions.length})
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Mechanics Ranking Dialog (when clicking on a mechanic in "all" view) */}
      <Dialog
        open={isMechanicDialogOpen}
        onOpenChange={setIsMechanicDialogOpen}
      >
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Mecánica: {selectedMechanicRanking?.title}
            </DialogTitle>
            <div className="text-sm text-muted-foreground">
              Total: {selectedMechanicRanking?.count} promociones
            </div>
          </DialogHeader>

          {selectedMechanicRanking && (
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>País</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Premio</TableHead>
                    <TableHead>Concepto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedMechanicRanking.promotions.map((promotion) => (
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

      {/* Prizes Ranking Dialog (when clicking on a prize in "all" view) */}
      <Dialog open={isPrizeDialogOpen} onOpenChange={setIsPrizeDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Premio: {selectedPrizeRanking?.name}
            </DialogTitle>
            <div className="text-sm text-muted-foreground">
              Total: {selectedPrizeRanking?.count} promociones
            </div>
          </DialogHeader>

          {selectedPrizeRanking && (
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>País</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Mecánica</TableHead>
                    <TableHead>Concepto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedPrizeRanking.promotions.map((promotion) => (
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

      {/* View All Mechanic Promotions Dialog */}
      <Dialog open={mechanicViewAllOpen} onOpenChange={setMechanicViewAllOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Todas las promociones -{" "}
              {
                availableMechanics.find((m) => m.value === selectedMechanic)
                  ?.label
              }
            </DialogTitle>
            <div className="text-sm text-muted-foreground">
              Total: {mechanicPromotions.length} promociones
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
                  <TableHead>Premio</TableHead>
                  <TableHead>Concepto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mechanicPromotions.map((promotion) => (
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

      {/* View All Prize Promotions Dialog */}
      <Dialog open={prizeViewAllOpen} onOpenChange={setPrizeViewAllOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Todas las promociones -{" "}
              {availablePrizes.find((p) => p.value === selectedPrize)?.label}
            </DialogTitle>
            <div className="text-sm text-muted-foreground">
              Total: {prizePromotions.length} promociones
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
                  <TableHead>Concepto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prizePromotions.map((promotion) => (
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
