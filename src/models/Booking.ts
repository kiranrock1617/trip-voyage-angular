
import { Flight } from './Flight';
import { Train } from './Train';
import { Bus } from './Bus';

export interface Passenger {
  name: string;
  age: number;
  gender: string;
}

export interface BookingDetails {
  id: string;
  bookingType: 'flight' | 'train' | 'bus';
  bookingDate: string;
  passengers: Passenger[];
  totalAmount: number;
  item?: Flight | Train | Bus;
}
