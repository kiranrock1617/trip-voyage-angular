
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TrainService } from "@/services/TrainService";
import { Train } from "@/models/Train";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Train as TrainIcon, ArrowLeft, Clock, Users, Calendar } from "lucide-react";

const TrainDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [train, setTrain] = useState<Train | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadTrainDetails(id);
    }
  }, [id]);

  const loadTrainDetails = async (trainId: string) => {
    try {
      setLoading(true);
      const data = await TrainService.getTrainById(trainId);
      if (data) {
        setTrain(data);
        if (data.classes && data.classes.length > 0) {
          setSelectedClass(data.classes[0]);
        }
      } else {
        toast({
          title: "Not Found",
          description: "Train not found. It may have been removed or is no longer available.",
          variant: "destructive",
        });
        navigate("/trains");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load train details. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (selectedClass) {
      navigate(`/trains/booking/${id}?class=${selectedClass}`);
    } else {
      toast({
        title: "Select Class",
        description: "Please select a travel class to continue.",
        variant: "default",
      });
    }
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

  if (!train) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Train Not Found</h2>
          <p className="text-gray-600 mb-6">The train you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/trains")}>Browse Available Trains</Button>
        </div>
      </Layout>
    );
  }

  // Calculate price based on selected class
  const getClassPrice = (basePrice: number, className: string) => {
    switch (className) {
      case "AC 1st Class":
        return basePrice * 2;
      case "AC 2-Tier":
        return basePrice * 1.5;
      case "AC 3-Tier":
        return basePrice * 1.2;
      case "AC Chair Car":
        return basePrice * 1.3;
      case "Executive Class":
        return basePrice * 2.2;
      case "Sleeper":
        return basePrice * 0.8;
      default:
        return basePrice;
    }
  };

  const currentPrice = selectedClass ? getClassPrice(train.price, selectedClass) : train.price;

  return (
    <Layout>
      <div className="container py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-gray-600"
          onClick={handleGoBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Train List
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b">
                  <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl font-bold mb-2">{train.trainName}</h1>
                    <p className="text-gray-600">{train.trainNumber}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-travel-primary">₹{currentPrice.toFixed(0)}</span>
                    <span className="text-gray-500 text-sm ml-2">per person</span>
                  </div>
                </div>
                
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start">
                  <div className="mb-4 md:mb-0 md:mr-8">
                    <p className="text-sm text-gray-500 mb-1">Departure</p>
                    <div className="flex items-center">
                      <div className="w-24 text-2xl font-bold">{train.departureTime}</div>
                      <div>
                        <p className="font-medium">{train.departureCity}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center mb-4 md:mb-0">
                    <p className="text-sm text-gray-500 mb-1">{train.duration}</p>
                    <div className="w-full h-0.5 bg-gray-300 relative">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-travel-primary"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-travel-primary"></div>
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <TrainIcon className="h-5 w-5 text-travel-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Arrival</p>
                    <div className="flex items-center">
                      <div className="w-24 text-2xl font-bold">{train.arrivalTime}</div>
                      <div>
                        <p className="font-medium">{train.arrivalCity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="font-bold mb-3">Available Classes</h2>
                  <div className="flex flex-wrap gap-3">
                    {train.classes.map((className) => (
                      <Button
                        key={className}
                        variant={selectedClass === className ? "default" : "outline"}
                        className={selectedClass === className ? "bg-travel-primary" : ""}
                        onClick={() => setSelectedClass(className)}
                      >
                        {className}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Clock className="h-5 w-5 text-travel-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{train.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Users className="h-5 w-5 text-travel-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Available Seats</p>
                      <p className="font-medium">{train.seatsAvailable}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Calendar className="h-5 w-5 text-travel-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Selected Class</p>
                      <p className="font-medium">{selectedClass || "Not Selected"}</p>
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
                    <span>₹{(currentPrice * 0.85).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reservation Charges</span>
                    <span>₹{(currentPrice * 0.05).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Tax</span>
                    <span>₹{(currentPrice * 0.1).toFixed(0)}</span>
                  </div>
                  <div className="pt-3 border-t flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span className="text-travel-primary">₹{currentPrice.toFixed(0)}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium mb-2">Cancellation Policy</h3>
                  <p className="text-sm text-gray-600">Cancellation charges vary by class and time before departure. Up to 48 hours: 25% charge. Less than 24 hours: No refund.</p>
                </div>
                
                {train.rating && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Train Rating</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < Math.floor(train.rating!) ? 'text-yellow-500' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{train.rating} out of 5</span>
                    </div>
                  </div>
                )}
                
                <div className="bg-travel-secondary p-4 rounded-md">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Note:</span> E-ticket passengers are required to carry ID proof in original during the journey.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleBookNow} 
                  className="w-full bg-travel-primary hover:bg-travel-primary/90"
                  disabled={!selectedClass}
                >
                  {selectedClass ? "Book Now" : "Select a Class"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrainDetail;
