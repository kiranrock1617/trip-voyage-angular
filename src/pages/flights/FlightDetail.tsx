
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FlightService } from "@/services/FlightService";
import { Flight } from "@/models/Flight";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Plane, ArrowLeft, Clock, Users, Calendar, MapPin } from "lucide-react";

const FlightDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleBookNow = () => {
    navigate(`/flights/booking/${id}`);
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
          <p className="text-gray-600 mb-6">The flight you're looking for doesn't exist or has been removed.</p>
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
          Back to Flight List
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b">
                  <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl font-bold mb-2">{flight.airline}</h1>
                    <p className="text-gray-600">{flight.flightNumber}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-travel-primary">₹{flight.price}</span>
                    <span className="text-gray-500 text-sm ml-2">per person</span>
                  </div>
                </div>
                
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start">
                  <div className="mb-4 md:mb-0 md:mr-8">
                    <p className="text-sm text-gray-500 mb-1">Departure</p>
                    <div className="flex items-center">
                      <div className="w-24 text-2xl font-bold">{flight.departureTime}</div>
                      <div>
                        <p className="font-medium">{flight.departureCity}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center mb-4 md:mb-0">
                    <p className="text-sm text-gray-500 mb-1">{flight.duration}</p>
                    <div className="w-full h-0.5 bg-gray-300 relative">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-travel-primary"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-travel-primary"></div>
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Plane className="h-5 w-5 text-travel-primary" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Direct Flight</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Arrival</p>
                    <div className="flex items-center">
                      <div className="w-24 text-2xl font-bold">{flight.arrivalTime}</div>
                      <div>
                        <p className="font-medium">{flight.arrivalCity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Clock className="h-5 w-5 text-travel-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{flight.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Users className="h-5 w-5 text-travel-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Available Seats</p>
                      <p className="font-medium">{flight.seatsAvailable}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Calendar className="h-5 w-5 text-travel-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Class</p>
                      <p className="font-medium">Economy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <MapPin className="h-5 w-5 text-travel-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Flight Type</p>
                      <p className="font-medium">Non-stop</p>
                    </div>
                  </div>
                </div>
                
                {flight.image && (
                  <div className="mt-6">
                    <img 
                      src={flight.image} 
                      alt={flight.airline} 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Fare Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Fare</span>
                    <span>₹{(flight.price * 0.8).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span>₹{(flight.price * 0.2).toFixed(0)}</span>
                  </div>
                  <div className="pt-3 border-t flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span className="text-travel-primary">₹{flight.price}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium mb-2">Cancellation Policy</h3>
                  <p className="text-sm text-gray-600">Free cancellation up to 24 hours before departure. Cancellation fee of ₹1500 applies after that.</p>
                </div>
                
                {flight.rating && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Airline Rating</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < Math.floor(flight.rating!) ? 'text-yellow-500' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{flight.rating} out of 5</span>
                    </div>
                  </div>
                )}
                
                <div className="bg-travel-secondary p-4 rounded-md">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Note:</span> Baggage allowance of 15kg check-in and 7kg cabin. Additional charges may apply for extra baggage.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleBookNow} 
                  className="w-full bg-travel-primary hover:bg-travel-primary/90"
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FlightDetail;
