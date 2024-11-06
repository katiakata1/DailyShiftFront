import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";
import Image from "next/image";
import { useState, useEffect } from "react";

import { useSnapshot } from "@/hooks/useSnapshot";
import { faker } from "@faker-js/faker";
import { ShiftSnapshot } from "./ShiftSnapshot";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startDate?: Date;
  startTime?: string;
  endDate?: Date;
  endTime?: string;
  shiftId: string | null;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  startDate,
  startTime,
  endDate,
  endTime,
  shiftId,
}: ConfirmationDialogProps) {
  const [showLoading, setShowLoading] = useState(true);
  const snapshot = useSnapshot("shift/", shiftId);
  useEffect(() => {
    if (snapshot) setShowLoading(false);
    return;
  }, [snapshot]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="flex flex-col items-center justify-center p-4">
          <Image
            src="https://assets.dailypay.com/wp-content/uploads/dailypay-logo.svg"
            alt="DailyPay Logo"
            width={120}
            height={30}
            className="mb-6"
            priority
          />
          {showLoading ? (
            <>
              {" "}
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF4D2D]"></div>
                <p className="text-[#FF4D2D] font-medium">
                  Processing your request...
                </p>
              </div>
            </>
          ) : (
            <></>
          )}

          {startDate && startTime && endDate && endTime && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>Creating shift from:</p>
              <p className="font-medium">
                {format(startDate, "MMM dd, yyyy")} at {startTime}
              </p>
              <p>to</p>
              <p className="font-medium">
                {format(endDate, "MMM dd, yyyy")} at {endTime}
              </p>
            </div>
          )}

          <ShiftSnapshot
            shift={snapshot}
            user={{
              prefix: faker.person.prefix(),
              fullName: faker.person.fullName(),
              jobTitle: faker.person.jobTitle(),
              email: faker.internet.email(),
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
