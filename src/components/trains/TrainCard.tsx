
import { Train } from "@/models/Train";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Train as TrainIcon } from "lucide-react";

interface TrainCardProps {
  train: Train;
}

const TrainCard = ({ train }: TrainCardProps) => {
  const navigate = useNavigate();

  const viewDetails = () => {
    navigate(`/trains/${train.id}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 bg-travel-secondary p-4 flex flex-col justify-center items-center">
            <div className="rounded-full bg-white p-2 mb-2">
              <TrainIcon className="h-6 w-6 text-travel-primary" />
            </div>
            <h3 className="font-medium">{train.trainName}</h3>
            <p className="text-sm text-gray-500">{train.trainNumber}</p>
          </div>

          <div className="w-full md:w-3/4 p-4">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="text-center mb-2 md:mb-0">
                <p className="text-lg font-bold">{train.departureTime}</p>
                <p className="text-sm text-gray-600">{train.departureCity}</p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-xs text-gray-500 mb-1">{train.duration}</p>
                <div className="relative w-32 md:w-40 h-0.5 bg-gray-300">
                  <div className="absolute -top-1.5 left-0 h-3 w-3 rounded-full bg-travel-primary"></div>
                  <div className="absolute -top-1.5 right-0 h-3 w-3 rounded-full bg-travel-primary"></div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg font-bold">{train.arrivalTime}</p>
                <p className="text-sm text-gray-600">{train.arrivalCity}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {train.classes.map((trainClass, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700"
                >
                  {trainClass}
                </span>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center border-t pt-3">
              <div>
                <p className="text-sm text-gray-500">Available Seats: <span className="text-travel-primary font-medium">{train.seatsAvailable}</span></p>
                {train.rating && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Rating:</span> 
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm ml-1">{train.rating}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center mt-3 md:mt-0">
                <p className="text-xl font-bold text-travel-primary mr-4">₹{train.price}</p>
                <Button 
                  onClick={viewDetails}
                  className="bg-travel-primary hover:bg-travel-primary/90"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainCard;
