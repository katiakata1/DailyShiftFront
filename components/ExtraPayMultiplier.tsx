import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ExtraPayMultiplier({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">Extra pay</label>

      <Select defaultValue={value} value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue defaultValue={value} placeholder="Multiplier" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Multiplier</SelectLabel>
            <SelectItem value={"1"}>x1.0</SelectItem>
            <SelectItem value={"1.5"}>x1.5</SelectItem>
            <SelectItem value={"2"}>x2.0</SelectItem>
            <SelectItem value={"4"}>x4.0</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
