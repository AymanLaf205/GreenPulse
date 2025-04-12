"use client";

import { useState } from 'react';
import { Plant } from '@/types/plant';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Droplet, Sun, Calendar, Trash2, Edit } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useI18n } from '@/components/i18n-provider';
import { toast } from 'sonner';

interface PlantCardProps {
  plant: Plant;
  onUpdate: (plant: Plant) => void;
  onDelete: (id: string) => void;
}

interface FormErrors {
  name?: string;
  wateringFrequency?: string;
  sunlight?: string;
}

export function PlantCard({ plant, onUpdate, onDelete }: PlantCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isWaterConfirmOpen, setIsWaterConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editedPlant, setEditedPlant] = useState(plant);
  const [errors, setErrors] = useState<FormErrors>({});
  const t = useTranslation();
  const { dir } = useI18n();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!editedPlant.name?.trim()) {
      newErrors.name = t('plant.validation.nameRequired');
    }
    if (!editedPlant.wateringFrequency || editedPlant.wateringFrequency < 1) {
      newErrors.wateringFrequency = t('plant.validation.wateringRequired');
    }
    if (!editedPlant.sunlight) {
      newErrors.sunlight = t('plant.validation.sunlightRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validateForm()) {
      return;
    }
    onUpdate(editedPlant);
    setErrors({});
    setIsEditing(false);
  };

  const handleWatering = async () => {
    try {
      const now = new Date();
      const updatedPlant: Plant = {
        ...plant,
        lastWatered: now,
        updatedAt: now
      };
      await onUpdate(updatedPlant);
      setIsWaterConfirmOpen(false);
      toast.success(t('plant.waterSuccess'));
    } catch (error) {
      console.error(error);
    }
  };

  const getNextWateringDate = () => {
    const lastWatered = plant.lastWatered ? new Date(plant.lastWatered) : new Date(plant.createdAt || Date.now());
    const nextDate = new Date(lastWatered);
    nextDate.setDate(nextDate.getDate() + plant.wateringFrequency);
    return nextDate;
  };

  const formatWateringText = () => {
    return t('plant.waterEvery', { days: plant.wateringFrequency });
  };

  const sunlightOptions = [
    'brightDirect',
    'brightIndirect',
    'mediumLight',
    'lowLight',
    'shade'
  ];

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="relative p-0">
        <img
          src={plant.image || 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=500&q=80'}
          alt={plant.name}
          className="w-full h-32 object-cover"
        />
      </CardHeader>
      <CardContent className="p-3 flex-grow">
        <h3 className="text-base font-semibold mb-1 truncate" title={plant.name}>{plant.name}</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1" dir={dir}>
            <Droplet className="h-3 w-3 text-blue-500 flex-shrink-0" />
            <span className="truncate">{formatWateringText()}</span>
          </div>
          <div className="flex items-center gap-1" dir={dir}>
            <Sun className="h-3 w-3 text-yellow-500 flex-shrink-0" />
            <span className="truncate">
              {plant.sunlight && t(`plant.sunlightOptions.${plant.sunlight}`)}
            </span>
          </div>
          <div className="flex items-center gap-1" dir={dir}>
            <Calendar className="h-3 w-3 text-green-500 flex-shrink-0" />
            <span className="truncate">
              {t('plant.lastWatered')}: {new Date(plant.lastWatered || plant.dateAdded).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-1" dir={dir}>
            <Calendar className="h-3 w-3 text-orange-500 flex-shrink-0" />
            <span className="truncate">
              {t('plant.nextWatering')}: {getNextWateringDate().toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-1 p-2 pt-0" dir={dir}>
        <Button
          variant="outline"
          size="sm"
          className="text-xs px-2 h-8"
          onClick={() => setIsWaterConfirmOpen(true)}
        >
          <Droplet className="h-3 w-3 mr-1" />
          {t('plant.waterNow')}
        </Button>
        <div className="flex gap-2">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs px-2 h-8">
                <Edit className="h-3 w-3 mr-1" />
                {t('actions.edit')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('plant.edit')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('plant.name')}</Label>
                  <Input
                    id="name"
                    value={editedPlant.name}
                    onChange={(e) => setEditedPlant({ ...editedPlant, name: e.target.value })}
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
                    value={editedPlant.wateringFrequency}
                    onChange={(e) => setEditedPlant({ ...editedPlant, wateringFrequency: parseInt(e.target.value) })}
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
                    value={editedPlant.sunlight}
                    onValueChange={(value) => setEditedPlant({ ...editedPlant, sunlight: value })}
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
                    value={editedPlant.image || ''}
                    onChange={(e) => setEditedPlant({ ...editedPlant, image: e.target.value })}
                    placeholder={t('plant.imagePlaceholder')}
                    dir={dir}
                  />
                </div>
              </div>
              <DialogFooter className="gap-4 sm:gap-0">
                <Button variant="outline" onClick={() => {
                  setIsEditing(false);
                  setErrors({});
                }}>
                  {t('actions.cancel')}
                </Button>
                <Button onClick={handleUpdate}>{t('actions.save')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant="destructive"
            size="sm"
            className="text-xs px-2 h-8"
            onClick={() => setIsDeleteConfirmOpen(true)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            {t('plant.delete')}
          </Button>
        </div>
      </CardFooter>

      <Dialog open={isWaterConfirmOpen} onOpenChange={setIsWaterConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('plant.waterConfirm')}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={() => setIsWaterConfirmOpen(false)}>
              {t('actions.cancel')}
            </Button>
            <Button onClick={handleWatering}>
              {t('actions.confirm')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('plant.deleteConfirm')}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              {t('actions.cancel')}
            </Button>
            <Button variant="destructive" onClick={() => onDelete(plant.id)}>
              {t('actions.delete')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}