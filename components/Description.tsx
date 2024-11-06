import { Textarea } from "./ui/textarea";

export function Description({
  description,
  onChange,
}: {
  description: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">Description</label>
      <Textarea
        value={description}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
