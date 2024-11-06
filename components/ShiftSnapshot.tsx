import { Shift } from "@/hooks/useCreateShift";
import { faker } from "@faker-js/faker";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function ShiftSnapshot({ shift, user }: { shift: Shift; user: any }) {
  //@ts-ignore
  const startTime = new Date(shift.startTime?.seconds * 1000);
  //@ts-ignore
  const endTime = new Date(shift.endTime?.seconds * 1000);

  const cardTitle = `${startTime.toLocaleDateString("en-US", {
    month: "short", // Short month name, like "Nov"
    day: "numeric", // Day of the month
    //@ts-ignore
  })} - ${endTime.toLocaleDateString("en-US", {
    month: "short", // Short month name, like "Nov"
    day: "numeric", // Day of the month
  })}`;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{shift.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-10">
          <div className="flex flex-col">
            <Avatar>
              <AvatarImage
                className="shadow"
                src={faker.image.avatar()}
                alt="profile pic"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col max-w-60">
            <h1 className="font-semibold">{`${user.prefix} ${user.fullName}`}</h1>
            <h1>{user.jobTitle}</h1>
            <h1>{user.email}</h1>
          </div>
          <div className="flex flex-col ms-auto">
            <h1 className="font-bold">
              Pay Multiplier: x{shift.payMultiplier}
            </h1>
            <h1 className="font-semibold">
              From:{" "}
              {startTime.toLocaleTimeString("en-US", {
                hour: "numeric", // Displays the hour in 12-hour format
                minute: "2-digit", // Displays the minutes with a leading zero if necessary
                hour12: true, // Ensures the 12-hour format with AM/PM
              })}
            </h1>
            <h1 className="font-semibold">
              To:{" "}
              {endTime.toLocaleTimeString("en-US", {
                hour: "numeric", // Displays the hour in 12-hour format
                minute: "2-digit", // Displays the minutes with a leading zero if necessary
                hour12: true, // Ensures the 12-hour format with AM/PM
              })}
            </h1>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}