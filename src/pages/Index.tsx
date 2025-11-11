/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { countryStats, deportes, inspiracionBrands, mexicoCategorias, mexicoSubcategorias, mockPromotions } from '@/data/promotions-mock-data';
import { PromoTypeRanking } from '@/components/dashboard/PromoTypeRanking';
import { MechanicsAndPrizes } from '@/components/dashboard/MechanicsAndPrizes';
import { InspirationSection } from '@/components/dashboard/InspirationSection';
import { PromotionsTable } from '@/components/dashboard/PromotionsTable';


type Country = 'BRASIL' | 'CHILE' | 'GUATEMALA' | 'MEXICO' | 'COLOMBIA';

export default function Index() {
  const [activeTab, setActiveTab] = useState<'latam' | 'paises' | 'categoria'>('latam');
  
  // Estados para filtros LATAM
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [selectedSubcategorias, setSelectedSubcategorias] = useState<string[]>([]);
  const [selectedTipoPromo, setSelectedTipoPromo] = useState<string[]>([]);
  const [selectedDeportes, setSelectedDeportes] = useState<string[]>([]);
  const [selectedCelebrities, setSelectedCelebrities] = useState<string[]>([]);
  
  // Estados para tab de países
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryFilters, setCountryFilters] = useState({
    categorias: [] as string[],
    subcategorias: [] as string[],
    tipoPromo: [] as string[],
    deportes: [] as string[],
    celebrities: [] as string[]
  });
  
  // Estados para tab de categoría
  const [selectedCategoriaView, setSelectedCategoriaView] = useState<string | null>(null);
  const [selectedRelacionPepsico, setSelectedRelacionPepsico] = useState<string[]>([]);

  // Filtrar promociones según la tab activa
  const filteredPromotions = useMemo(() => {
    let promos = [...mockPromotions];

    if (activeTab === 'latam') {
      // Filtros LATAM (todas las promociones)
      if (selectedCategorias.length > 0) {
        promos = promos.filter(p => selectedCategorias.includes(p.categoria));
      }
      if (selectedTipoPromo.length > 0) {
        promos = promos.filter(p => selectedTipoPromo.includes(p.tipoPromo));
      }
      if (selectedDeportes.length > 0) {
        promos = promos.filter(p => {
          return selectedDeportes.some(dep => {
            if (dep === 'f1') return p.f1;
            if (dep === 'mundial') return p.mundial;
            if (dep === 'nfl') return p.nfl;
            if (dep === 'uefa') return p.uefaChampionsLeague;
            return false;
          });
        });
      }
      if (selectedCelebrities.length > 0) {
        promos = promos.filter(p => p.concepto === 'CELEBRITIES' && selectedCelebrities.includes(p.celebrity || ''));
      }
    } else if (activeTab === 'paises' && selectedCountry) {
      // Filtrar por país seleccionado
      promos = promos.filter(p => p.pais === selectedCountry);
      
      if (countryFilters.categorias.length > 0) {
        promos = promos.filter(p => countryFilters.categorias.includes(p.categoria));
      }
      if (countryFilters.tipoPromo.length > 0) {
        promos = promos.filter(p => countryFilters.tipoPromo.includes(p.tipoPromo));
      }
      if (countryFilters.deportes.length > 0) {
        promos = promos.filter(p => {
          return countryFilters.deportes.some(dep => {
            if (dep === 'f1') return p.f1;
            if (dep === 'mundial') return p.mundial;
            if (dep === 'nfl') return p.nfl;
            if (dep === 'uefa') return p.uefaChampionsLeague;
            return false;
          });
        });
      }
    } else if (activeTab === 'categoria') {
      // Filtrar por categoría y relación con PepsiCo
      if (selectedCategoriaView) {
        promos = promos.filter(p => p.categoria === selectedCategoriaView);
      }
      if (selectedRelacionPepsico.length > 0) {
        promos = promos.filter(p => selectedRelacionPepsico.includes(p.relacionPepsico));
      }
    }

    return promos;
  }, [activeTab, selectedCategorias, selectedTipoPromo, selectedDeportes, selectedCelebrities, selectedCountry, countryFilters, selectedCategoriaView, selectedRelacionPepsico]);

  // Función para descargar CSV
  const downloadCSV = () => {
    const headers = [
      'ID', 'País', 'Tipo Promo', 'Clasificación', 'Mecánica', 'Premio',
      'Marca', 'Categoría', 'Temporalidad', 'Concepto', 'F1', 'Mundial',
      'NFL', 'UEFA', 'Éxito', 'Relación PepsiCo', 'Celebrity'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredPromotions.map(p => [
        p.id,
        p.pais,
        p.tipoPromo,
        p.clasificacion,
        `"${p.mecanica}"`,
        `"${p.premio}"`,
        p.marca,
        `"${p.categoria}"`,
        p.temporalidad,
        p.concepto,
        p.f1 ? 'Sí' : 'No',
        p.mundial ? 'Sí' : 'No',
        p.nfl ? 'Sí' : 'No',
        p.uefaChampionsLeague ? 'Sí' : 'No',
        p.promoExito ? 'Sí' : 'No',
        p.relacionPepsico,
        p.celebrity || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `promociones_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Obtener celebrities únicas de las promociones
  const celebrities = useMemo(() => {
    return Array.from(new Set(
      mockPromotions
        .filter(p => p.celebrity)
        .map(p => p.celebrity!)
    ));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard de Promociones LATAM
          </h1>
          <p className="text-slate-600">
            Análisis integral de promociones en Latinoamérica
          </p>
        </div>

        {/* Tabs principales */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="latam" className="text-lg">
              LATAM
            </TabsTrigger>
            <TabsTrigger value="paises" className="text-lg">
              Países
            </TabsTrigger>
            <TabsTrigger value="categoria" className="text-lg">
              Categoría
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: LATAM */}
          <TabsContent value="latam" className="space-y-6">
            {/* Banderas (solo visualización, no clickeables) */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Distribución por País</h2>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(countryStats).map(([country, count]) => (
                  <div key={country} className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-4xl mb-2">
                      {country === 'BRASIL' && '🇧🇷'}
                      {country === 'CHILE' && '🇨🇱'}
                      {country === 'GUATEMALA' && '🇬🇹'}
                      {country === 'MEXICO' && '🇲🇽'}
                      {country === 'COLOMBIA' && '🇨🇴'}
                    </div>
                    <div className="font-semibold">{country}</div>
                    <div className="text-2xl font-bold text-blue-600">{count}</div>
                    <div className="text-sm text-slate-600">promociones</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tipo de Promo */}
            <PromoTypeRanking promotions={filteredPromotions} />

            {/* Mecánicas y Premios */}
            <MechanicsAndPrizes promotions={filteredPromotions} />

            {/* Filtros de Categorías (renglón completo) */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Filtrar por Categoría</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Categorías</h3>
                  <div className="flex flex-wrap gap-2">
                    {mexicoCategorias.map(cat => (
                      <Button
                        key={cat}
                        variant={selectedCategorias.includes(cat) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedCategorias(prev =>
                            prev.includes(cat)
                              ? prev.filter(c => c !== cat)
                              : [...prev, cat]
                          );
                        }}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {selectedCategorias.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Subcategorías</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategorias.flatMap(cat => 
                        mexicoSubcategorias[cat] || []
                      ).map(subcat => (
                        <Button
                          key={subcat}
                          variant={selectedSubcategorias.includes(subcat) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setSelectedSubcategorias(prev =>
                              prev.includes(subcat)
                                ? prev.filter(s => s !== subcat)
                                : [...prev, subcat]
                            );
                          }}
                        >
                          {subcat}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Inspiración (sin Coca-Cola) */}
            <InspirationSection brands={inspiracionBrands.filter(b => b.nombre !== 'Coca-Cola')} />

            {/* Deportes */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Promociones por Deporte</h2>
              <div className="grid grid-cols-4 gap-4">
                {deportes.map(deporte => {
                  const count = mockPromotions.filter(p => {
                    if (deporte.id === 'f1') return p.f1;
                    if (deporte.id === 'mundial') return p.mundial;
                    if (deporte.id === 'nfl') return p.nfl;
                    if (deporte.id === 'uefa') return p.uefaChampionsLeague;
                    return false;
                  }).length;

                  return (
                    <Button
                      key={deporte.id}
                      variant={selectedDeportes.includes(deporte.id) ? "default" : "outline"}
                      className="h-24 flex flex-col items-center justify-center"
                      onClick={() => {
                        setSelectedDeportes(prev =>
                          prev.includes(deporte.id)
                            ? prev.filter(d => d !== deporte.id)
                            : [...prev, deporte.id]
                        );
                      }}
                    >
                      <span className="text-3xl mb-2">{deporte.icon}</span>
                      <span className="font-semibold">{deporte.nombre}</span>
                      <span className="text-sm">{count} promos</span>
                    </Button>
                  );
                })}
              </div>
            </Card>

            {/* Celebrities */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Promociones con Celebrities</h2>
              <div className="flex flex-wrap gap-2">
                {celebrities.map(celebrity => (
                  <Button
                    key={celebrity}
                    variant={selectedCelebrities.includes(celebrity) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedCelebrities(prev =>
                        prev.includes(celebrity)
                          ? prev.filter(c => c !== celebrity)
                          : [...prev, celebrity]
                      );
                    }}
                  >
                    {celebrity}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Insights IA (al final) */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-purple-600">🤖</span>
                Insights IA - Análisis por Categorías LATAM
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Tendencias principales</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li>Las bebidas gaseosas lideran con el 28% de las promociones totales</li>
                    <li>Promociones transaccionales representan el 65% del total</li>
                    <li>Brasil y México concentran el 55% de las activaciones</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Recomendaciones</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li>Incrementar presencia en categoría de snacks salados (oportunidad de crecimiento)</li>
                    <li>Fortalecer alianzas deportivas, especialmente en Mundial y UEFA</li>
                    <li>Considerar más promociones de engagement para mejorar fidelización</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Tabla de promociones */}
            <PromotionsTable promotions={filteredPromotions} />

            {/* Botón de descarga */}
            <div className="flex justify-center">
              <Button onClick={downloadCSV} size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Descargar información filtrada (CSV)
              </Button>
            </div>
          </TabsContent>

          {/* TAB 2: PAÍSES */}
          <TabsContent value="paises" className="space-y-6">
            {/* Selector de país */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Selecciona un País</h2>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(countryStats).map(([country, count]) => (
                  <Button
                    key={country}
                    variant={selectedCountry === country ? "default" : "outline"}
                    className="h-70 flex flex-col items-center justify-center gap-2"
                    onClick={() => setSelectedCountry(country as Country)}
                  >
                    <div className="text-4xl">
                      {country === 'BRASIL' && '🇧🇷'}
                      {country === 'CHILE' && '🇨🇱'}
                      {country === 'GUATEMALA' && '🇬🇹'}
                      {country === 'MEXICO' && '🇲🇽'}
                      {country === 'COLOMBIA' && '🇨🇴'}
                    </div>
                    <div className="font-semibold">{country}</div>
                    <div className={selectedCountry === country ? "text-2xl font-bold" : "text-2xl font-bold text-blue-600"}>{count}</div>
                    <div className={selectedCountry === country ? "text-sm" : "text-sm text-slate-600"}>promociones</div>
                  </Button>
                ))}
              </div>
            </Card>

            {selectedCountry ? (
              <>
                {/* Filtros para el país seleccionado */}
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Filtros para {selectedCountry}</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Categorías</h3>
                      <div className="flex flex-wrap gap-2">
                        {mexicoCategorias.map(cat => (
                          <Button
                            key={cat}
                            variant={countryFilters.categorias.includes(cat) ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              setCountryFilters(prev => ({
                                ...prev,
                                categorias: prev.categorias.includes(cat)
                                  ? prev.categorias.filter(c => c !== cat)
                                  : [...prev.categorias, cat]
                              }));
                            }}
                          >
                            {cat}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <PromoTypeRanking promotions={filteredPromotions} />
                <MechanicsAndPrizes promotions={filteredPromotions} />
                
                {/* Deportes para el país */}
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Deportes - {selectedCountry}</h2>
                  <div className="grid grid-cols-4 gap-4">
                    {deportes.map(deporte => {
                      const count = filteredPromotions.filter(p => {
                        if (deporte.id === 'f1') return p.f1;
                        if (deporte.id === 'mundial') return p.mundial;
                        if (deporte.id === 'nfl') return p.nfl;
                        if (deporte.id === 'uefa') return p.uefaChampionsLeague;
                        return false;
                      }).length;

                      return (
                        <div key={deporte.id} className="text-center p-4 bg-slate-50 rounded-lg">
                          <div className="text-3xl mb-2">{deporte.icon}</div>
                          <div className="font-semibold">{deporte.nombre}</div>
                          <div className="text-2xl font-bold text-blue-600">{count}</div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <PromotionsTable promotions={filteredPromotions} />
                
                <div className="flex justify-center">
                  <Button onClick={downloadCSV} size="lg" className="gap-2">
                    <Download className="w-5 h-5" />
                    Descargar promociones de {selectedCountry} (CSV)
                  </Button>
                </div>
              </>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-xl text-slate-600">
                  Selecciona un país para ver sus promociones
                </p>
              </Card>
            )}
          </TabsContent>

          {/* TAB 3: CATEGORÍA */}
          <TabsContent value="categoria" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Análisis por Categoría y Competencia</h2>
              
              {/* Selector de categoría */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Selecciona una Categoría</h3>
                  <div className="flex flex-wrap gap-2">
                    {mexicoCategorias.map(cat => (
                      <Button
                        key={cat}
                        variant={selectedCategoriaView === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategoriaView(cat)}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Selector de relación con PepsiCo */}
                <div>
                  <h3 className="font-semibold mb-2">Relación con PepsiCo</h3>
                  <div className="flex gap-2">
                    {['PEPSICO', 'COMPETENCIA DIRECTA', 'COMPETENCIA OTROS'].map(rel => (
                      <Button
                        key={rel}
                        variant={selectedRelacionPepsico.includes(rel) ? "default" : "outline"}
                        onClick={() => {
                          setSelectedRelacionPepsico(prev =>
                            prev.includes(rel)
                              ? prev.filter(r => r !== rel)
                              : [...prev, rel]
                          );
                        }}
                      >
                        {rel}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {selectedCategoriaView && (
              <>
                {/* Estadísticas de la categoría */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-6 bg-blue-50">
                    <h3 className="font-semibold mb-2">PepsiCo</h3>
                    <div className="text-3xl font-bold text-blue-600">
                      {filteredPromotions.filter(p => p.relacionPepsico === 'PEPSICO').length}
                    </div>
                    <p className="text-sm text-slate-600">promociones propias</p>
                  </Card>
                  <Card className="p-6 bg-orange-50">
                    <h3 className="font-semibold mb-2">Competencia Directa</h3>
                    <div className="text-3xl font-bold text-orange-600">
                      {filteredPromotions.filter(p => p.relacionPepsico === 'COMPETENCIA DIRECTA').length}
                    </div>
                    <p className="text-sm text-slate-600">promociones competidores</p>
                  </Card>
                  <Card className="p-6 bg-purple-50">
                    <h3 className="font-semibold mb-2">Competencia Indirecta</h3>
                    <div className="text-3xl font-bold text-purple-600">
                      {filteredPromotions.filter(p => p.relacionPepsico === 'COMPETENCIA OTROS').length}
                    </div>
                    <p className="text-sm text-slate-600">otras marcas</p>
                  </Card>
                </div>

                {/* Insights de competencia */}
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                  <h2 className="text-2xl font-bold mb-4">Análisis Competitivo</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">Estrategia PepsiCo</h3>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                        <li>Foco en promociones de valor y descuentos</li>
                        <li>Fuerte presencia en eventos deportivos</li>
                        <li>Partnerships con celebrities de alto impacto</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">Estrategia Competencia</h3>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                        <li>Mayor inversión en experiencias premium</li>
                        <li>Programas de fidelización más desarrollados</li>
                        <li>Activaciones digitales innovadoras</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <PromotionsTable promotions={filteredPromotions} />

                <div className="flex justify-center">
                  <Button onClick={downloadCSV} size="lg" className="gap-2">
                    <Download className="w-5 h-5" />
                    Descargar análisis de {selectedCategoriaView} (CSV)
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}