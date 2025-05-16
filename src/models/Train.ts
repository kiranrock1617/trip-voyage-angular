
export interface Train {
  id: string;
  trainName: string;
  trainNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  classes: string[];
  rating?: number;
}
