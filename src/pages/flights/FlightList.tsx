
import { useState, useEffect } from "react";
import { FlightService } from "@/services/FlightService";
import { Flight } from "@/models/Flight";
import FlightCard from "@/components/flights/FlightCard";
import SearchForm from "@/components/common/SearchForm";
import Layout from "@/components/layout/Layout";
import { Plane } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const FlightList = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      setLoading(true);
      const data = await FlightService.getFlights();
      setFlights(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load flights. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (from: string, to: string, date: Date) => {
    try {
      setLoading(true);
      const data = await FlightService.searchFlights(from, to);
      setFlights(data);
      setSearchPerformed(true);
      
      // Show no results message as a toast if no flights found
      if (data.length === 0) {
        toast({
          title: "No Flights Found",
          description: `We couldn't find any flights from ${from} to ${to} on ${date.toLocaleDateString()}. Please try different search criteria.`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search flights. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Flights</h1>
          <p className="text-gray-600">Search for the best flights across major airlines</p>
        </div>

        <div className="mb-8">
          <SearchForm type="flight" onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {flights.length > 0 ? (
              <>
                <p className="text-sm text-gray-500">
                  {flights.length} {flights.length === 1 ? "flight" : "flights"} found
                </p>
                {flights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </>
            ) : searchPerformed ? (
              <div className="text-center py-12">
                <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-600 mb-2">No Flights Found</h2>
                <p className="text-gray-500 mb-4">
                  We couldn't find any flights matching your search criteria.
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-600 mb-2">Search for Flights</h2>
                <p className="text-gray-500 mb-4">
                  Enter your travel details above to find available flights.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FlightList;
