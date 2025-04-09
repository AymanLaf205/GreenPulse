export interface Plant {
  id?: string;
  name: string;
  wateringFrequency: number;
  sunlight: string;
  image: string;
  lastWatered?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}