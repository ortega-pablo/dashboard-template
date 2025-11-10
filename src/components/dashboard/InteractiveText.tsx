import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InteractiveTextProps {
  text?: string;
}

export const InteractiveText = ({ text }: InteractiveTextProps) => {
  const defaultText = 
    "En este período las promociones transaccionales dominan el mercado con un 60% del total. " +
    "México lidera con 50 promociones activas, seguido de Chile con 100 promociones. " +
    "Las categorías de comida y snacks representan el 63% del total de activaciones.";

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2">
      <CardHeader>
        <CardTitle className="text-lg">Insights IA</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-foreground">
          {text || defaultText}
        </p>
      </CardContent>
    </Card>
  );
};
