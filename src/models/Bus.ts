
export interface Bus {
  id: string;
  busOperator: string;
  busType: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  amenities: string[];
  rating?: number;
}
