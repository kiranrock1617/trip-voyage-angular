
export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  image?: string;
  rating?: number;
}
