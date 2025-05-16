
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FlightService } from "@/services/FlightService";
import { Flight } from "@/models/Flight";
import { Passenger, BookingDetails } from "@/models/Booking";
import Layout from "@/components/layout/Layout";
import BookingSuccessModal from "@/components/common/BookingSuccessModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, UserPlus, X } from "lucide-react";

const FlightBooking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | undefined>(undefined);

  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: "", age: 0, gender: "male" }
  ]);

  useEffect(() => {
    if (id) {
      loadFlightDetails(id);
    }
  }, [id]);

  const loadFlightDetails = async (flightId: string) => {
    try {
      setLoading(true);
      const data = await FlightService.getFlightById(flightId);
      if (data) {
        setFlight(data);
      } else {
        toast({
          title: "Not Found",
          description: "Flight not found. It may have been removed or is no longer available.",
          variant: "destructive",
        });
        navigate("/flights");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load flight details. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string | number) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: field === 'age' ? Number(value) : value
    };
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    if (passengers.length < 5) {
      setPassengers([...passengers, { name: "", age: 0, gender: "male" }]);
    } else {
      toast({
        title: "Maximum Reached",
        description: "You can book for a maximum of 5 passengers at once.",
        variant: "default",
      });
    }
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      const updatedPassengers = [...passengers];
      updatedPassengers.splice(index, 1);
      setPassengers(updatedPassengers);
    } else {
      toast({
        title: "Cannot Remove",
        description: "At least one passenger is required.",
        variant: "default",
      });
    }
  };

  const handleBooking = () => {
    if (!flight) return;
    
    // Simple validation
    const isValid = passengers.every(p => p.name.trim() && p.age > 0);
    
    if (!isValid) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all passenger details correctly.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this to your backend
    const newBooking: BookingDetails = {
      id: `FLT-${Date.now().toString().slice(-6)}`,
      bookingType: 'flight',
      bookingDate: new Date().toISOString(),
      passengers,
      totalAmount: flight.price * passengers.length,
      item: flight
    };
    
    setBookingDetails(newBooking);
    setShowSuccessModal(true);
    
    toast({
      title: "Booking Successful",
      description: `Your flight booking has been confirmed. Reference ID: ${newBooking.id}`,
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!flight) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Flight Not Found</h2>
          <p className="text-gray-600 mb-6">The flight you're trying to book doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/flights")}>Browse Available Flights</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-gray-600"
          onClick={handleGoBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Flight Details
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Book Your Flight</h1>
          <p className="text-gray-600">Complete the booking process by filling in passenger details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Flight Details</h2>
                <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-medium">{flight.airline} - {flight.flightNumber}</h3>
                    <p className="text-gray-600 text-sm">
                      {flight.departureCity} to {flight.arrivalCity}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">
                      {flight.departureTime} - {flight.arrivalTime}
                    </p>
                    <p className="text-gray-600 text-sm">Duration: {flight.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Passenger Information</h2>
                  <Button
                    onClick={addPassenger}
                    variant="outline"
                    className="flex items-center text-sm"
                    disabled={passengers.length >= 5}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Passenger
                  </Button>
                </div>
                
                {passengers.map((passenger, index) => (
                  <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50 relative">
                    <h3 className="font-medium mb-4">Passenger {index + 1}</h3>
                    
                    {passengers.length > 1 && (
                      <button 
                        onClick={() => removePassenger(index)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${index}`}>Full Name</Label>
                        <Input
                          id={`name-${index}`}
                          placeholder="Enter passenger name"
                          value={passenger.name}
                          onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`age-${index}`}>Age</Label>
                        <Input
                          id={`age-${index}`}
                          type="number"
                          placeholder="Enter age"
                          min="0"
                          value={passenger.age || ""}
                          onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`gender-${index}`}>Gender</Label>
                        <select
                          id={`gender-${index}`}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={passenger.gender}
                          onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Price Summary</h2>
                
                <div className="space-y-3 mb-6">
                  {passengers.map((_, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">Passenger {index + 1}</span>
                      <span>₹{flight.price.toFixed(0)}</span>
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span className="text-travel-primary">₹{(flight.price * passengers.length).toFixed(0)}</span>
                  </div>
                </div>
                
                <div className="bg-travel-secondary p-4 rounded-md mb-6">
                  <h3 className="font-medium mb-2">Important Information</h3>
                  <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                    <li>Carry a valid ID proof while traveling</li>
                    <li>Check-in closes 45 minutes before departure</li>
                    <li>Baggage allowance: 15kg</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={handleBooking}
                  className="w-full bg-travel-primary hover:bg-travel-primary/90"
                >
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {showSuccessModal && bookingDetails && (
          <BookingSuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            bookingDetails={bookingDetails}
          />
        )}
      </div>
    </Layout>
  );
};

export default FlightBooking;
