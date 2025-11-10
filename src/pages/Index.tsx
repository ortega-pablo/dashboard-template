import { useState } from "react";
import { CountryFlags } from "@/components/dashboard/CountryFlags";
import { PromoTypeRanking } from "@/components/dashboard/PromoTypeRanking";
import { InteractiveText } from "@/components/dashboard/InteractiveText";
import { MechanicsAndPrizes } from "@/components/dashboard/MechanicsAndPrizes";
import { ConceptSection } from "@/components/dashboard/ConceptSection";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { InspirationSection } from "@/components/dashboard/InspirationSection";
import { LicenseShowcase } from "@/components/dashboard/LicenseShowcase";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("LATAM");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Mundo de la Promo
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Dashboard de análisis de promociones</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Top Section - Country Flags */}
        <CountryFlags onCountrySelect={setSelectedCountry} />

        {/* Second Row - Ranking by Type and Interactive Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PromoTypeRanking />
          <InteractiveText />
        </div>

        {/* Third Row - Mechanics and Prizes */}
        <MechanicsAndPrizes />


        {/* Fifth Row - Concept (Sports/Celebrities) and Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InspirationSection />
          <CategoryChart />
        </div>

        {/* License Showcase - Full Width */}
        <LicenseShowcase />
      </main>
    </div>
  );
};

export default Index;