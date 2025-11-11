import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Brand {
  nombre: string;
  descripcion: string;
  imageUrl: string;
  relacionPepsico: string;
}

interface InspirationSectionProps {
  brands: Brand[];
}

export function InspirationSection({ brands }: InspirationSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Promociones Inspiración</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.nombre}
            className="group relative overflow-hidden rounded-lg border border-slate-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg"
          >
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-6xl font-bold text-slate-300">
                {brand.nombre[0]}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{brand.nombre}</h3>
              <Badge 
                variant={
                  brand.relacionPepsico === 'PEPSICO' 
                    ? 'default' 
                    : brand.relacionPepsico === 'COMPETENCIA DIRECTA'
                    ? 'destructive'
                    : 'secondary'
                }
                className="mb-2"
              >
                {brand.relacionPepsico}
              </Badge>
              <p className="text-sm text-slate-600 line-clamp-2">
                {brand.descripcion}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm">{brand.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
