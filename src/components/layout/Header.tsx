
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plane, Train, Bus } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-travel-primary p-1">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-travel-primary">TravelEase</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/flights"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-travel-primary ${
              isActive("/flights") ? "text-travel-primary" : "text-gray-600"
            }`}
          >
            <Plane className="h-4 w-4" />
            Flights
          </Link>
          <Link
            to="/trains"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-travel-primary ${
              isActive("/trains") ? "text-travel-primary" : "text-gray-600"
            }`}
          >
            <Train className="h-4 w-4" />
            Trains
          </Link>
          <Link
            to="/buses"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-travel-primary ${
              isActive("/buses") ? "text-travel-primary" : "text-gray-600"
            }`}
          >
            <Bus className="h-4 w-4" />
            Buses
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline">Log In</Button>
          <Button className="bg-travel-primary hover:bg-travel-primary/90">Sign Up</Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        
        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-white shadow-md py-4">
            <nav className="flex flex-col gap-4 px-6">
              <Link
                to="/flights"
                className="flex items-center gap-2 py-2 hover:text-travel-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plane className="h-4 w-4" />
                Flights
              </Link>
              <Link
                to="/trains"
                className="flex items-center gap-2 py-2 hover:text-travel-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Train className="h-4 w-4" />
                Trains
              </Link>
              <Link
                to="/buses"
                className="flex items-center gap-2 py-2 hover:text-travel-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bus className="h-4 w-4" />
                Buses
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" className="w-full">Log In</Button>
                <Button className="w-full bg-travel-primary hover:bg-travel-primary/90">Sign Up</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
