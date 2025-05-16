
import { useState, useEffect } from "react";
import { TrainService } from "@/services/TrainService";
import { Train } from "@/models/Train";
import TrainCard from "@/components/trains/TrainCard";
import SearchForm from "@/components/common/SearchForm";
import Layout from "@/components/layout/Layout";
import { Train as TrainIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const TrainList = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    loadTrains();
  }, []);

  const loadTrains = async () => {
    try {
      setLoading(true);
      const data = await TrainService.getTrains();
      setTrains(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load trains. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (from: string, to: string, date: Date) => {
    try {
      setLoading(true);
      const data = await TrainService.searchTrains(from, to);
      setTrains(data);
      setSearchPerformed(true);

      if (data.length === 0) {
        toast({
          title: "No Trains Found",
          description: `We couldn't find any trains from ${from} to ${to} on ${date.toLocaleDateString()}. Please try different search criteria.`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search trains. Please try again later.",
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Trains</h1>
          <p className="text-gray-600">Search for the best trains across India</p>
        </div>

        <div className="mb-8">
          <SearchForm type="train" onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {trains.length > 0 ? (
              <>
                <p className="text-sm text-gray-500">
                  {trains.length} {trains.length === 1 ? "train" : "trains"} found
                </p>
                {trains.map((train) => (
                  <TrainCard key={train.id} train={train} />
                ))}
              </>
            ) : searchPerformed ? (
              <div className="text-center py-12">
                <TrainIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-600 mb-2">No Trains Found</h2>
                <p className="text-gray-500 mb-4">
                  We couldn't find any trains matching your search criteria.
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrainIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-600 mb-2">Search for Trains</h2>
                <p className="text-gray-500 mb-4">
                  Enter your travel details above to find available trains.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrainList;
