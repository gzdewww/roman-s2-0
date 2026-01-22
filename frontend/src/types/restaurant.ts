export interface ManagerShort {
  id: number;
  name: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  seatsCount: number;
  imageUrl?: string;
  manager?: ManagerShort;
}
