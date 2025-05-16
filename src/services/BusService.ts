
import { Bus } from "../models/Bus";

// Mock data for buses
const mockBuses: Bus[] = [
  {
    id: "b1",
    busOperator: "SRS Travels",
    busType: "Volvo Multi-Axle Sleeper",
    departureCity: "Bangalore",
    arrivalCity: "Hyderabad",
    departureTime: "10:00 PM",
    arrivalTime: "06:00 AM",
    duration: "8h",
    price: 1200,
    seatsAvailable: 35,
    amenities: ["WiFi", "Charging Port", "Blanket", "Water Bottle"],
    rating: 4.2
  },
  {
    id: "b2",
    busOperator: "VRL Travels",
    busType: "AC Sleeper",
    departureCity: "Mumbai",
    arrivalCity: "Goa",
    departureTime: "08:00 PM",
    arrivalTime: "08:00 AM",
    duration: "12h",
    price: 1500,
    seatsAvailable: 25,
    amenities: ["WiFi", "Charging Port", "Entertainment System"],
    rating: 4.0
  },
  {
    id: "b3",
    busOperator: "Kallada Travels",
    busType: "Mercedes AC Sleeper",
    departureCity: "Chennai",
    arrivalCity: "Bangalore",
    departureTime: "09:30 PM",
    arrivalTime: "04:30 AM",
    duration: "7h",
    price: 950,
    seatsAvailable: 40,
    amenities: ["WiFi", "Snacks", "Water Bottle"],
    rating: 3.8
  },
  {
    id: "b4",
    busOperator: "Ashok Travels",
    busType: "Non-AC Seater",
    departureCity: "Delhi",
    arrivalCity: "Jaipur",
    departureTime: "06:00 AM",
    arrivalTime: "12:00 PM",
    duration: "6h",
    price: 550,
    seatsAvailable: 45,
    amenities: ["Water Bottle"],
    rating: 3.5
  }
];

export const BusService = {
  getBuses: () => {
    return Promise.resolve(mockBuses);
  },
  
  getBusById: (id: string) => {
    const bus = mockBuses.find(bus => bus.id === id);
    return Promise.resolve(bus);
  },
  
  searchBuses: (departure: string, arrival: string) => {
    const filteredBuses = mockBuses.filter(
      bus => bus.departureCity.toLowerCase().includes(departure.toLowerCase()) && 
             bus.arrivalCity.toLowerCase().includes(arrival.toLowerCase())
    );
    return Promise.resolve(filteredBuses);
  },
  
  bookBus: (busId: string, passengers: any, seatNumbers: string[]) => {
    // In a real app, this would interact with a backend
    const bus = mockBuses.find(bus => bus.id === busId);
    if (!bus) {
      return Promise.reject("Bus not found");
    }
    
    const booking = {
      id: `booking-${Date.now()}`,
      busDetails: bus,
      passengers,
      seatNumbers,
      bookingDate: new Date().toISOString(),
      status: "Confirmed"
    };
    
    return Promise.resolve(booking);
  }
};
