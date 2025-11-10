import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FilterSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">País</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar país" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="ar">Argentina</SelectItem>
                <SelectItem value="br">Brasil</SelectItem>
                <SelectItem value="cl">Chile</SelectItem>
                <SelectItem value="mx">México</SelectItem>
                <SelectItem value="co">Colombia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Mecánicas</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar mecánica" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="contest">Concurso</SelectItem>
                <SelectItem value="sweepstakes">Sorteo</SelectItem>
                <SelectItem value="instant">Instante</SelectItem>
                <SelectItem value="collect">Colecciona</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Premio</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar premio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="cash">Efectivo</SelectItem>
                <SelectItem value="product">Producto</SelectItem>
                <SelectItem value="travel">Viaje</SelectItem>
                <SelectItem value="experience">Experiencia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
