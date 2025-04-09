"use client";

import { useState } from 'react';
import { Plant } from '@/types/plant';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useI18n } from '@/components/i18n-provider';
import { toast } from 'sonner';

interface AddPlantDialogProps {
  onAddPlant: (plant: Plant) => void;
}

interface FormErrors {
  name?: string;
  wateringFrequency?: string;
  sunlight?: string;
}

export function AddPlantDialog({ onAddPlant }: AddPlantDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newPlant, setNewPlant] = useState<Partial<Plant>>({
    name: '',
    wateringFrequency: 7,
    sunlight: '',
    image: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const t = useTranslation();
  const { locale, dir } = useI18n();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!newPlant.name?.trim()) {
      newErrors.name = t('plant.validation.nameRequired');
    }
    if (!newPlant.wateringFrequency || newPlant.wateringFrequency < 1) {
      newErrors.wateringFrequency = t('plant.validation.wateringRequired');
    }
    if (!newPlant.sunlight) {
      newErrors.sunlight = t('plant.validation.sunlightRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addPlant = async (newPlant: Partial<Plant>) => {
    // ...existing code...
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const plant: Plant = {
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
      ...newPlant
    } as Plant;
    
    onAddPlant(plant);
    setNewPlant({
      name: '',
      wateringFrequency: 7,
      sunlight: '',
      image: ''
    });
    setErrors({});
    setIsOpen(false);
  };

  const sunlightOptions = [
    'brightDirect',
    'brightIndirect',
    'mediumLight',
    'lowLight',
    'shade'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t('plant.add')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('plant.add')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('plant.name')}</Label>
            <Input
              id="name"
              value={newPlant.name}
              onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
              placeholder={t('plant.namePlaceholder')}
              dir={dir}
              className={errors.name ? "border-red-500" : ""}
              required
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="watering">{t('plant.wateringFrequency')}</Label>
            <Input
              id="watering"
              type="number"
              min="1"
              value={newPlant.wateringFrequency}
              onChange={(e) => setNewPlant({ ...newPlant, wateringFrequency: parseInt(e.target.value) })}
              placeholder={t('plant.wateringPlaceholder')}
              dir={dir}
              className={errors.wateringFrequency ? "border-red-500" : ""}
              required
            />
            {errors.wateringFrequency && <p className="text-sm text-red-500">{errors.wateringFrequency}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="sunlight">{t('plant.sunlight')}</Label>
            <Select
              value={newPlant.sunlight}
              onValueChange={(value) => setNewPlant({ ...newPlant, sunlight: value })}
              required
            >
              <SelectTrigger className={errors.sunlight ? "border-red-500" : ""}>
                <SelectValue placeholder={t('plant.sunlightPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {sunlightOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {t(`plant.sunlightOptions.${option}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.sunlight && <p className="text-sm text-red-500">{errors.sunlight}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">{t('plant.imageUrl')}</Label>
            <Input
              id="image"
              value={newPlant.image}
              onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })}
              placeholder={t('plant.imagePlaceholder')}
              dir={dir}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={() => {
            setIsOpen(false);
            setErrors({});
          }}>
            {t('actions.cancel')}
          </Button>
          <Button onClick={handleSubmit}>{t('actions.add')}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}