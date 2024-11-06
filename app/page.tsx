"use client";

import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Header } from "@/components/Header";
import { ShiftCreationDialog } from "@/components/ShiftCreationDialog";
import useCreateShift, { Shift } from "@/hooks/useCreateShift";
import { useSnapshot } from "@/hooks/useSnapshot";
import { useCallback, useState } from "react";

export default function Home() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [description, setDescription] = useState<string>("");
  const [payMultiplier, setPayMultiplier] = useState<string>("1");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { createShift } = useCreateShift();
  const snapshot = useSnapshot<Shift[]>("shift");

  const handlePost = useCallback(
    (
      startTime: Date,
      endTime: Date,
      description: string,
      payMultiplier: number,
    ) => {
      createShift({
        startTime,
        endTime,
        description,
        payMultiplier,
        employeeId: "123",
      });
      if (!startDate || !endDate || !startTime || !endTime) return;
      setShowConfirmation(true);
    },
    [createShift, setShowConfirmation],
  );

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <div className="container mx-auto px-4 py-8">
        <Header />

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-[#FF4D2D] mb-6">
              Shift Management
            </h2>

            <ShiftCreationDialog
              startDate={startDate}
              startTime={startTime}
              endDate={endDate}
              endTime={endTime}
              payMultiplier={payMultiplier}
              description={description}
              onStartDateChange={setStartDate}
              onStartTimeChange={setStartTime}
              onEndDateChange={setEndDate}
              onEndTimeChange={setEndTime}
              onMultiplierChange={setPayMultiplier}
              onDescriptionChange={setDescription}
              onPost={handlePost}
            />

            <ConfirmationDialog
              open={showConfirmation}
              onOpenChange={setShowConfirmation}
              startDate={startDate}
              startTime={startTime}
              endDate={endDate}
              endTime={endTime}
            />

            {/* This is shit I'm lazy to explain
            <div className="flex flex-col gap-3 my-3">
              {snapshot.length > 0 ? (
                snapshot.map((shift) => <ShiftSnapshot shift={shift} />)
              ) : (
                <></>
              )}
              </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
