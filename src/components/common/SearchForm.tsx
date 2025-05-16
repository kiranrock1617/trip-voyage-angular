
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface SearchFormProps {
  type: 'flight' | 'train' | 'bus';
  onSearch: (from: string, to: string, date: Date) => void;
}

const SearchForm = ({ type, onSearch }: SearchFormProps) => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(fromCity, toCity, date);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            placeholder={`Departure City`}
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            placeholder={`Arrival City`}
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
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

        <div className="flex items-end">
          <Button 
            type="submit" 
            className="w-full bg-travel-primary hover:bg-travel-primary/90"
          >
            Search {type === 'flight' ? 'Flights' : type === 'train' ? 'Trains' : 'Buses'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
