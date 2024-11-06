import { Calendar } from "@/components/ui/calendar";
import { TimeSelect } from "./TimeSelect";

interface DateTimeSelectorProps {
  label: string;
  date?: Date;
  time?: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
}

export function DateTimeSelector({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
}: DateTimeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label} Date</label>
      <Calendar
        mode="single"
        selected={date}
        onSelect={onDateChange}
        className="rounded-md"
      />
      <TimeSelect
        label={`${label} Time`}
        value={time}
        onValueChange={onTimeChange}
      />
    </div>
  );
}
