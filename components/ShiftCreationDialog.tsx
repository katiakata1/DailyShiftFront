import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateTimeSelector } from "./DateTimeSelector";
import { Description } from "./Description";
import { ExtraPayMultiplier } from "./ExtraPayMultiplier";

interface ShiftCreationDialogProps {
  startDate?: Date;
  startTime?: string;
  endDate?: Date;
  endTime?: string;
  payMultiplier: string;
  description: string;
  onStartDateChange: (date: Date | undefined) => void;
  onStartTimeChange: (time: string) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onEndTimeChange: (time: string) => void;
  onDescriptionChange: (desc: string) => void;
  onMultiplierChange: (multiplier: string) => void;
  onPost: (
    endTime: Date,
    startTime: Date,
    description: string,
    payMultiplier: number,
  ) => void;
}

export function ShiftCreationDialog({
  startDate,
  startTime,
  endDate,
  endTime,
  payMultiplier,
  description,
  onStartDateChange,
  onStartTimeChange,
  onEndDateChange,
  onEndTimeChange,
  onDescriptionChange,
  onMultiplierChange,
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
      <DialogContent className="sm:max-w-[700px] lg:h-[88vh] h-[90vh] max-h-[900px]">
        <DialogTitle>Create Shift</DialogTitle>
        <ScrollArea className=" ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-2">
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
            <Description
              description={description}
              onChange={onDescriptionChange}
            />
            <ExtraPayMultiplier
              value={payMultiplier}
              onChange={onMultiplierChange}
            />
          </div>

          <Button
            onClick={() => {
              if (!startDate || !endDate || !startTime || !endTime) {
                console.error("Invalid date/time");
                return;
              }
              onPost(
                startDate,
                endDate,
                description,
                parseFloat(payMultiplier),
              );
            }}
            disabled={!startDate || !endDate || !startTime || !endTime}
            className="w-full bg-[#FF4D2D] hover:bg-[#E63D1F] text-white mt-4"
          >
            Post Shift
          </Button>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
