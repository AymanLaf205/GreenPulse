"use client";

import { useState, useEffect } from 'react';
import { Plant } from '@/types/plant';
import { PlantCard } from '@/components/plant-card';
import { AddPlantDialog } from '@/components/add-plant-dialog';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import { useI18n } from '@/components/i18n-provider';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { Footer } from '@/components/footer';

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const { dir } = useI18n();
  const t = useTranslation();

  useEffect(() => {
    const savedPlants = localStorage.getItem('plants');
    if (savedPlants) {
      setPlants(JSON.parse(savedPlants));
    }
  }, []);

  const savePlants = (newPlants: Plant[]) => {
    setPlants(newPlants);
    localStorage.setItem('plants', JSON.stringify(newPlants));
  };

  return (
    <div className={`min-h-screen bg-background ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <h1 className="text-2xl font-bold text-foreground">{t('app.title')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-foreground">{t('app.subtitle')}</h2>
          <AddPlantDialog onAddPlant={(plant) => savePlants([...plants, plant])} />
        </div>

        {plants.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Footer />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onUpdate={(updatedPlant) => {
                    const newPlants = plants.map((p) =>
                      p.id === updatedPlant.id ? updatedPlant : p
                    );
                    savePlants(newPlants);
                  }}
                  onDelete={(id) => {
                    savePlants(plants.filter((p) => p.id !== id));
                  }}
                />
              ))}
            </div>
            <div className="mt-12">
              <Footer />
            </div>
          </>
        )}
      </main>
    </div>
  );
}