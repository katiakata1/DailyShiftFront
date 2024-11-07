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
    console.log(showLoading);
    if (snapshot?.["accepted_users"]) setShowLoading(false);
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
              <p>Creating opportunity from:</p>
              <p className="font-medium">
                {format(startDate, "MMM dd, yyyy")} at {startTime}
              </p>
              <p>to</p>
              <p className="font-medium">
                {format(endDate, "MMM dd, yyyy")} at {endTime}
              </p>
            </div>
          )}
          {snapshot?.["accepted_users"] && (
            <ShiftSnapshot
              shift={snapshot}
              user={{
                prefix: "",
                fullName: snapshot?.["accepted_users"]?.[0]?.["fullName"],
                jobTitle: snapshot?.["accepted_users"]?.[0]?.["role"],
                email: snapshot?.["accepted_users"]?.[0]?.["phoneNumber"],
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
