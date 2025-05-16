
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, Plane, Train, Bus } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("flights");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!from.trim() || !to.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both departure and arrival cities.",
        variant: "destructive",
      });
      return;
    }

    const searchParams = new URLSearchParams();
    searchParams.append("from", from);
    searchParams.append("to", to);
    searchParams.append("date", date.toISOString());
    
    navigate(`/${activeTab}?${searchParams.toString()}`);
  };

  return (
    <Layout>
      <div className="relative bg-travel-primary py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-primary to-purple-600 opacity-90"></div>
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Perfect Trip</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Find the best deals on flights, trains, and buses for your journey
          </p>
        </div>
      </div>
      
      <div className="container -mt-16 relative z-20">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Tabs defaultValue="flights" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="flights" className="py-3">
                <Plane className="w-5 h-5 mr-2" />
                Flights
              </TabsTrigger>
              <TabsTrigger value="trains" className="py-3">
                <Train className="w-5 h-5 mr-2" />
                Trains
              </TabsTrigger>
              <TabsTrigger value="buses" className="py-3">
                <Bus className="w-5 h-5 mr-2" />
                Buses
              </TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    placeholder={`Departure City`}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    placeholder={`Arrival City`}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Travel Date</Label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(day) => {
                          if (day) {
                            setDate(day);
                            setIsCalendarOpen(false);
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto bg-travel-primary hover:bg-travel-primary/90 px-8 py-3 text-lg"
              >
                Search {activeTab === "flights" ? "Flights" : activeTab === "trains" ? "Trains" : "Buses"}
              </Button>
            </form>
          </Tabs>
        </div>
      </div>
      
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why Choose TravelEase?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer the best travel booking experience with a wide range of options and unbeatable prices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="booking-card">
            <div className="w-12 h-12 rounded-full bg-travel-secondary flex items-center justify-center mb-4 mx-auto">
              <Plane className="service-icon" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Flight Booking</h3>
            <p className="text-gray-600 text-center">
              Book flights to hundreds of destinations worldwide with competitive prices and great offers
            </p>
          </div>
          
          <div className="booking-card">
            <div className="w-12 h-12 rounded-full bg-travel-secondary flex items-center justify-center mb-4 mx-auto">
              <Train className="service-icon" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Train Booking</h3>
            <p className="text-gray-600 text-center">
              Hassle-free train bookings with instant confirmation and a wide range of classes to choose from
            </p>
          </div>
          
          <div className="booking-card">
            <div className="w-12 h-12 rounded-full bg-travel-secondary flex items-center justify-center mb-4 mx-auto">
              <Bus className="service-icon" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Bus Booking</h3>
            <p className="text-gray-600 text-center">
              Choose from various bus operators providing comfortable travel options at affordable prices
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-travel-secondary py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Popular Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore these top destinations with great deals on flights, trains, and buses
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { name: "Delhi", image: "https://images.unsplash.com/photo-1574314290916-c1c1c50d2c84?q=80&w=2069", price: "2,499" },
              { name: "Mumbai", image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2435", price: "3,299" },
              { name: "Bangalore", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2071", price: "2,899" },
              { name: "Hyderabad", image: "https://images.unsplash.com/photo-1631072805471-a2b0c30bd841?q=80&w=2070", price: "2,799" },
            ].map((destination, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl">
                <div className="aspect-[3/4] bg-gray-100">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5 text-white">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <p>Starting from ₹{destination.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Trusted by Millions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our satisfied customers who enjoy seamless travel booking experiences every day
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Priya Sharma",
              location: "Delhi",
              text: "TravelEase made my trip planning so easy! Found a great flight deal and the booking process was seamless. Highly recommend!"
            },
            {
              name: "Rajesh Kumar",
              location: "Mumbai",
              text: "The train booking feature saved me so much time. I got instant confirmation and the journey was exactly as described. Will use again!"
            },
            {
              name: "Ananya Patel",
              location: "Bangalore",
              text: "Booked a bus to Goa through TravelEase and it was the smoothest experience. Clean bus, on-time departure, and good service."
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-travel-secondary flex items-center justify-center mr-4">
                  <span className="font-bold text-travel-primary">{testimonial.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-700">"{testimonial.text}"</p>
              <div className="mt-4">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
