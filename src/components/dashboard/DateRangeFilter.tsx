import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface DateRangeFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onClearFilter: () => void;
  totalPromotions: number;
  filteredPromotions: number;
}

export function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClearFilter,
  totalPromotions,
  filteredPromotions,
}: DateRangeFilterProps) {
  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">
            📅 Filtrar por Período de Análisis
          </h3>
          {(startDate || endDate) && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilter}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Limpiar filtro
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Fecha de inicio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Fecha de inicio
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, 'PPP', { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate || undefined}
                  onSelect={(date) => onStartDateChange(date || null)}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Fecha de fin */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Fecha de fin
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !endDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, 'PPP', { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate || undefined}
                  onSelect={(date) => onEndDateChange(date || null)}
                  initialFocus
                  disabled={(date) =>
                    startDate ? date < startDate : false
                  }
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Resumen del filtro */}
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">
                Mostrando{' '}
                <span className="font-bold text-blue-600">
                  {filteredPromotions}
                </span>{' '}
                de{' '}
                <span className="font-bold text-slate-800">
                  {totalPromotions}
                </span>{' '}
                promociones
              </p>
              {(startDate || endDate) && (
                <p className="text-xs text-slate-500 mt-1">
                  {startDate && endDate ? (
                    <>
                      Período: {format(startDate, 'dd/MM/yyyy')} -{' '}
                      {format(endDate, 'dd/MM/yyyy')}
                    </>
                  ) : startDate ? (
                    <>Desde: {format(startDate, 'dd/MM/yyyy')}</>
                  ) : endDate ? (
                    <>Hasta: {format(endDate, 'dd/MM/yyyy')}</>
                  ) : null}
                </p>
              )}
            </div>
            
            {filteredPromotions === 0 && (startDate || endDate) && (
              <div className="text-amber-600 text-sm font-medium">
                ⚠️ Sin resultados para este período
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}