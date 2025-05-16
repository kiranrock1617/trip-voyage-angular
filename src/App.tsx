
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Flight pages
import FlightList from "./pages/flights/FlightList";
import FlightDetail from "./pages/flights/FlightDetail";
import FlightBooking from "./pages/flights/FlightBooking";

// Train pages
import TrainList from "./pages/trains/TrainList";
import TrainDetail from "./pages/trains/TrainDetail";
import TrainBooking from "./pages/trains/TrainBooking";

// Bus pages
import BusList from "./pages/buses/BusList";
import BusDetail from "./pages/buses/BusDetail";
import BusBooking from "./pages/buses/BusBooking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Index />} />
          
          {/* Flight Routes */}
          <Route path="/flights" element={<FlightList />} />
          <Route path="/flights/:id" element={<FlightDetail />} />
          <Route path="/flights/booking/:id" element={<FlightBooking />} />
          
          {/* Train Routes */}
          <Route path="/trains" element={<TrainList />} />
          <Route path="/trains/:id" element={<TrainDetail />} />
          <Route path="/trains/booking/:id" element={<TrainBooking />} />
          
          {/* Bus Routes */}
          <Route path="/buses" element={<BusList />} />
          <Route path="/buses/:id" element={<BusDetail />} />
          <Route path="/buses/booking/:id" element={<BusBooking />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
