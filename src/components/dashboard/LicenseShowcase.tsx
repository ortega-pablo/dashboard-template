import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface License {
  id: number;
  name: string;
  count: number;
}

const licenses: License[] = [
  { id: 1, name: "Marvel", count: 24 },
  { id: 2, name: "Disney", count: 18 },
  { id: 3, name: "Star Wars", count: 15 },
  { id: 4, name: "DC Comics", count: 12 },
];

export const LicenseShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Licencias (Personajes)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {licenses.map((license) => (
            <div
              key={license.id}
              className="relative aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border hover:border-primary transition-colors p-4 flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {license.id}
              </div>
              <div className="text-sm font-medium">{license.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {license.count} promos
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
