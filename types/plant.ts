export interface Plant {
  id: string;
  name: string;
  wateringFrequency: number;
  lastWatered?: string;
  dateAdded: string;
  image?: string;
}