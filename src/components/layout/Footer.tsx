
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">TravelEase</h3>
            <p className="text-gray-600 text-sm">
              Your one-stop solution for all travel needs. Book flights, trains, and buses at the best prices.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/flights" className="text-gray-600 hover:text-travel-primary">Flight Booking</Link></li>
              <li><Link to="/trains" className="text-gray-600 hover:text-travel-primary">Train Booking</Link></li>
              <li><Link to="/buses" className="text-gray-600 hover:text-travel-primary">Bus Booking</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-travel-primary">Special Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-travel-primary">Our Story</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-travel-primary">Careers</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-travel-primary">Press</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-travel-primary">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-travel-primary">FAQs</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-travel-primary">Cancellation Policy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-travel-primary">Terms & Conditions</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-travel-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
