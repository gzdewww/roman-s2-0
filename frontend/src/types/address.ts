export interface Address {
  id?: number;
  street: string;
  building: number;
  apartment?: number;
  floor?: number;
  entrance?: number;
  comment?: string;
}
