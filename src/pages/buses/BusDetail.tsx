
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BusService } from "@/services/BusService";
import { Bus } from "@/models/Bus";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Bus as BusIcon, ArrowLeft, Clock, Users, Calendar } from "lucide-react";

const BusDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bus, setBus] = useState<Bus | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("Seater");

  useEffect(() => {
    if (id) {
      loadBusDetails(id);
    }
  }, [id]);

  const loadBusDetails = async (busId: string) => {
    try {
      setLoading(true);
      const data = await BusService.getBusById(busId);
      if (data) {
        setBus(data);
        setSelectedType(data.busType.includes("Sleeper") ? "Sleeper" : "Seater");
      } else {
        toast({
          title: "Not Found",
          description: "Bus not found. It may have been removed or is no longer available.",
          variant: "destructive",
        });
        navigate("/buses");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load bus details. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigate(`/buses/booking/${id}?type=${selectedType}`);
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

  if (!bus) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Bus Not Found</h2>
          <p className="text-gray-600 mb-6">The bus you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/buses")}>Browse Available Buses</Button>
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
          Back to Bus List
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b">
                  <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl font-bold mb-2">{bus.busOperator}</h1>
                    <p className="text-gray-600">{bus.busType}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-travel-primary">₹{bus.price}</span>
                    <span className="text-gray-500 text-sm ml-2">per person</span>
                  </div>
                </div>
                
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start">
                  <div className="mb-4 md:mb-0 md:mr-8">
                    <p className="text-sm text-gray-500 mb-1">Departure</p>
                    <div className="flex items-center">
                      <div className="w-24 text-2xl font-bold">{bus.departureTime}</div>
                      <div>
                        <p className="font-medium">{bus.departureCity}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center mb-4 md:mb-0">
                    <p className="text-sm text-gray-500 mb-1">{bus.duration}</p>
                    <div className="w-full h-0.5 bg-gray-300 relative">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-travel-primary"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-travel-primary"></div>
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <BusIcon className="h-5 w-5 text-travel-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Arrival</p>
                    <div className="flex items-center">
                      <div className="w-24 text-2xl font-bold">{bus.arrivalTime}</div>
                      <div>
                        <p className="font-medium">{bus.arrivalCity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="font-bold mb-3">Bus Type</h2>
                  <div className="flex gap-3">
                    {bus.busType.includes("Sleeper") && (
                      <Button
                        variant={selectedType === "Sleeper" ? "default" : "outline"}
                        className={selectedType === "Sleeper" ? "bg-travel-primary" : ""}
                        onClick={() => setSelectedType("Sleeper")}
                      >
                        Sleeper
                      </Button>
                    )}
                    <Button
                      variant={selectedType === "Seater" ? "default" : "outline"}
                      className={selectedType === "Seater" ? "bg-travel-primary" : ""}
                      onClick={() => setSelectedType("Seater")}
                    >
                      Seater
                    </Button>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="font-bold mb-3">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {bus.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Clock className="h-5 w-5 text-travel-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{bus.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Users className="h-5 w-5 text-travel-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Available Seats</p>
                      <p className="font-medium">{bus.seatsAvailable}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Calendar className="h-5 w-5 text-travel-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Selected Type</p>
                      <p className="font-medium">{selectedType}</p>
                    </div>
                  </div>
                </div>
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
                    <span>₹{(bus.price * 0.85).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span>₹{(bus.price * 0.05).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>₹{(bus.price * 0.1).toFixed(0)}</span>
                  </div>
                  <div className="pt-3 border-t flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span className="text-travel-primary">₹{bus.price.toFixed(0)}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium mb-2">Cancellation Policy</h3>
                  <p className="text-sm text-gray-600">
                    Before 12 hours: 75% refund. Between 12-4 hours: 50% refund. Less than 4 hours: No refund.
                  </p>
                </div>
                
                {bus.rating && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Bus Rating</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < Math.floor(bus.rating!) ? 'text-yellow-500' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{bus.rating} out of 5</span>
                    </div>
                  </div>
                )}
                
                <div className="bg-travel-secondary p-4 rounded-md">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Note:</span> Arrive at the boarding point at least 15 minutes before departure. Baggage allowance of 15kg per passenger.
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

export default BusDetail;
