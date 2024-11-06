import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateTimeSelector } from "./DateTimeSelector";

interface ShiftCreationDialogProps {
  startDate?: Date;
  startTime?: string;
  endDate?: Date;
  endTime?: string;
  isLoading: boolean;
  onStartDateChange: (date: Date | undefined) => void;
  onStartTimeChange: (time: string) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onEndTimeChange: (time: string) => void;
  onPost: () => void;
}

export function ShiftCreationDialog({
  startDate,
  startTime,
  endDate,
  endTime,
  isLoading,
  onStartDateChange,
  onStartTimeChange,
  onEndDateChange,
  onEndTimeChange,
  onPost,
}: ShiftCreationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-[#FF4D2D] hover:bg-[#E63D1F] text-white"
          size="lg"
        >
          Create New Shift
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] lg:h-[78vh] h-[90vh] max-h-[900px]">
        <DialogTitle>Create Shift</DialogTitle>
        <ScrollArea className="h-full pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <DateTimeSelector
              label="Start"
              date={startDate}
              time={startTime}
              onDateChange={onStartDateChange}
              onTimeChange={onStartTimeChange}
            />
            <DateTimeSelector
              label="End"
              date={endDate}
              time={endTime}
              onDateChange={onEndDateChange}
              onTimeChange={onEndTimeChange}
            />
          </div>
          <Button
            onClick={onPost}
            disabled={
              !startDate || !endDate || !startTime || !endTime || isLoading
            }
            className="w-full bg-[#FF4D2D] hover:bg-[#E63D1F] text-white mt-4"
          >
            Post Shift
          </Button>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
