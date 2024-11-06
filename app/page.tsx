"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ShiftCreationDialog } from "@/components/ShiftCreationDialog";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import useCreateShift from "@/hooks/useCreateShift";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { createShift } = useCreateShift();
  const handlePost = (endTime: Date, startTime: Date) => {
    createShift({
      endTime,
      startTime,
      employeeId: "123",
    });
    if (!startDate || !endDate || !startTime || !endTime) return;
    setIsLoading(true);
    setShowConfirmation(true);
    // Simulated API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

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
              isLoading={isLoading}
              onStartDateChange={setStartDate}
              onStartTimeChange={setStartTime}
              onEndDateChange={setEndDate}
              onEndTimeChange={setEndTime}
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
          </div>
        </div>
      </div>
    </main>
  );
}
