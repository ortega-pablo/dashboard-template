import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface SubConcept {
  name: string;
  percentage: number;
}

const sportsSubConcepts: SubConcept[] = [
  { name: "Mundial", percentage: 35 },
  { name: "F1", percentage: 28 },
  { name: "NFL", percentage: 22 },
  { name: "UEFA", percentage: 15 },
];

const celebritiesSubConcepts: SubConcept[] = [
  { name: "Música", percentage: 40 },
  { name: "Cine", percentage: 30 },
  { name: "TV", percentage: 20 },
  { name: "Influencers", percentage: 10 },
];

const concepts = {
  deportes: sportsSubConcepts,
  celebridades: celebritiesSubConcepts,
};

export const ConceptSection = () => {
  const [selectedConcept, setSelectedConcept] = useState<"deportes" | "celebridades">("deportes");

  const currentSubConcepts = concepts[selectedConcept];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promos Deporte</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedConcept} onValueChange={(value) => setSelectedConcept(value as "deportes" | "celebridades")}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="deportes">Deportes</SelectItem>
            <SelectItem value="celebridades">Celebridades</SelectItem>
          </SelectContent>
        </Select>

        <div className="space-y-3">
          {currentSubConcepts.map((subConcept) => (
            <div key={subConcept.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{subConcept.name}</span>
                <span className="text-primary font-bold">{subConcept.percentage}%</span>
              </div>
              <Progress value={subConcept.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
