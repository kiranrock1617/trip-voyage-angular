
import { Flight } from "../models/Flight";

// Mock data for flights
const mockFlights: Flight[] = [
  {
    id: "f1",
    airline: "IndiGo",
    flightNumber: "6E-123",
    departureCity: "Mumbai",
    arrivalCity: "Delhi",
    departureTime: "08:00 AM",
    arrivalTime: "10:00 AM",
    duration: "2h",
    price: 4500,
    seatsAvailable: 45,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074",
    rating: 4.2
  },
  {
    id: "f2",
    airline: "Air India",
    flightNumber: "AI-456",
    departureCity: "Delhi",
    arrivalCity: "Bangalore",
    departureTime: "10:30 AM",
    arrivalTime: "01:00 PM",
    duration: "2h 30m",
    price: 5200,
    seatsAvailable: 30,
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070",
    rating: 3.8
  },
  {
    id: "f3",
    airline: "SpiceJet",
    flightNumber: "SG-789",
    departureCity: "Bangalore",
    arrivalCity: "Kolkata",
    departureTime: "02:00 PM",
    arrivalTime: "04:30 PM",
    duration: "2h 30m",
    price: 3800,
    seatsAvailable: 22,
    image: "https://images.unsplash.com/photo-1525624286412-4099c83c1bc8?q=80&w=1932",
    rating: 3.9
  },
  {
    id: "f4",
    airline: "Vistara",
    flightNumber: "UK-321",
    departureCity: "Chennai",
    arrivalCity: "Mumbai",
    departureTime: "06:00 PM",
    arrivalTime: "08:00 PM",
    duration: "2h",
    price: 6100,
    seatsAvailable: 15,
    image: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?q=80&w=2069",
    rating: 4.5
  }
];

export const FlightService = {
  getFlights: () => {
    return Promise.resolve(mockFlights);
  },
  
  getFlightById: (id: string) => {
    const flight = mockFlights.find(flight => flight.id === id);
    return Promise.resolve(flight);
  },
  
  searchFlights: (departure: string, arrival: string) => {
    const filteredFlights = mockFlights.filter(
      flight => flight.departureCity.toLowerCase().includes(departure.toLowerCase()) && 
                flight.arrivalCity.toLowerCase().includes(arrival.toLowerCase())
    );
    return Promise.resolve(filteredFlights);
  },
  
  bookFlight: (flightId: string, passengers: any) => {
    // In a real app, this would interact with a backend
    const flight = mockFlights.find(flight => flight.id === flightId);
    if (!flight) {
      return Promise.reject("Flight not found");
    }
    
    const booking = {
      id: `booking-${Date.now()}`,
      flightDetails: flight,
      passengers,
      bookingDate: new Date().toISOString(),
      status: "Confirmed"
    };
    
    return Promise.resolve(booking);
  }
};
