
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingDetails } from "@/models/Booking";
import { useNavigate } from "react-router-dom";

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails?: BookingDetails;
}

const BookingSuccessModal = ({ isOpen, onClose, bookingDetails }: BookingSuccessModalProps) => {
  const navigate = useNavigate();

  if (!bookingDetails) {
    return null;
  }

  const handleViewBookings = () => {
    // In a real app, this would navigate to a bookings page
    navigate("/");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-travel-primary">
            Booking Successful!
          </DialogTitle>
          <DialogDescription className="text-center">
            Your {bookingDetails.bookingType} has been booked successfully.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-4 bg-travel-secondary rounded-lg">
          <div className="flex justify-between">
            <span className="text-gray-600">Booking ID:</span>
            <span className="font-medium">{bookingDetails.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Date:</span>
            <span className="font-medium">{new Date(bookingDetails.bookingDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Passengers:</span>
            <span className="font-medium">{bookingDetails.passengers.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-medium">₹{bookingDetails.totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex flex-col items-center mt-2">
          <p className="text-sm text-gray-500 mb-2">
            A copy of your booking details has been sent to your email.
          </p>
          <p className="text-sm text-gray-500">
            Please be at the departure location at least 1 hour before the scheduled time.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button 
            onClick={handleViewBookings}
            className="w-full sm:w-auto bg-travel-primary hover:bg-travel-primary/90"
          >
            View My Bookings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingSuccessModal;
