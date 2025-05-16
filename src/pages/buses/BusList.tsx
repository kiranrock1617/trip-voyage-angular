
import { useState, useEffect } from "react";
import { BusService } from "@/services/BusService";
import { Bus } from "@/models/Bus";
import BusCard from "@/components/buses/BusCard";
import SearchForm from "@/components/common/SearchForm";
import Layout from "@/components/layout/Layout";
import { Bus as BusIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const BusList = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      setLoading(true);
      const data = await BusService.getBuses();
      setBuses(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load buses. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (from: string, to: string, date: Date) => {
    try {
      setLoading(true);
      const data = await BusService.searchBuses(from, to);
      setBuses(data);
      setSearchPerformed(true);

      if (data.length === 0) {
        toast({
          title: "No Buses Found",
          description: `We couldn't find any buses from ${from} to ${to} on ${date.toLocaleDateString()}. Please try different search criteria.`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search buses. Please try again later.",
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Buses</h1>
          <p className="text-gray-600">Search for comfortable buses for your journey</p>
        </div>

        <div className="mb-8">
          <SearchForm type="bus" onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {buses.length > 0 ? (
              <>
                <p className="text-sm text-gray-500">
                  {buses.length} {buses.length === 1 ? "bus" : "buses"} found
                </p>
                {buses.map((bus) => (
                  <BusCard key={bus.id} bus={bus} />
                ))}
              </>
            ) : searchPerformed ? (
              <div className="text-center py-12">
                <BusIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-600 mb-2">No Buses Found</h2>
                <p className="text-gray-500 mb-4">
                  We couldn't find any buses matching your search criteria.
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <BusIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-600 mb-2">Search for Buses</h2>
                <p className="text-gray-500 mb-4">
                  Enter your travel details above to find available buses.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BusList;
