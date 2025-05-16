
import { Train } from "../models/Train";

// Mock data for trains
const mockTrains: Train[] = [
  {
    id: "t1",
    trainName: "Rajdhani Express",
    trainNumber: "12301",
    departureCity: "Delhi",
    arrivalCity: "Mumbai",
    departureTime: "04:30 PM",
    arrivalTime: "08:30 AM",
    duration: "16h",
    price: 1800,
    seatsAvailable: 120,
    classes: ["AC 1st Class", "AC 2-Tier", "AC 3-Tier"],
    rating: 4.1
  },
  {
    id: "t2",
    trainName: "Shatabdi Express",
    trainNumber: "12002",
    departureCity: "Mumbai",
    arrivalCity: "Pune",
    departureTime: "06:00 AM",
    arrivalTime: "09:30 AM",
    duration: "3h 30m",
    price: 750,
    seatsAvailable: 80,
    classes: ["AC Chair Car", "Executive Class"],
    rating: 4.3
  },
  {
    id: "t3",
    trainName: "Duronto Express",
    trainNumber: "12245",
    departureCity: "Bangalore",
    arrivalCity: "Chennai",
    departureTime: "11:00 PM",
    arrivalTime: "05:00 AM",
    duration: "6h",
    price: 1100,
    seatsAvailable: 95,
    classes: ["AC 2-Tier", "AC 3-Tier", "Sleeper"],
    rating: 3.9
  },
  {
    id: "t4",
    trainName: "Garib Rath",
    trainNumber: "12203",
    departureCity: "Kolkata",
    arrivalCity: "Delhi",
    departureTime: "02:00 PM",
    arrivalTime: "10:00 AM",
    duration: "20h",
    price: 850,
    seatsAvailable: 150,
    classes: ["AC 3-Tier", "Sleeper"],
    rating: 3.7
  }
];

export const TrainService = {
  getTrains: () => {
    return Promise.resolve(mockTrains);
  },
  
  getTrainById: (id: string) => {
    const train = mockTrains.find(train => train.id === id);
    return Promise.resolve(train);
  },
  
  searchTrains: (departure: string, arrival: string) => {
    const filteredTrains = mockTrains.filter(
      train => train.departureCity.toLowerCase().includes(departure.toLowerCase()) && 
               train.arrivalCity.toLowerCase().includes(arrival.toLowerCase())
    );
    return Promise.resolve(filteredTrains);
  },
  
  bookTrain: (trainId: string, passengers: any, classType: string) => {
    // In a real app, this would interact with a backend
    const train = mockTrains.find(train => train.id === trainId);
    if (!train) {
      return Promise.reject("Train not found");
    }
    
    const booking = {
      id: `booking-${Date.now()}`,
      trainDetails: train,
      passengers,
      classType,
      bookingDate: new Date().toISOString(),
      status: "Confirmed"
    };
    
    return Promise.resolve(booking);
  }
};
