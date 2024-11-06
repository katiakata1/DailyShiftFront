"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePost = () => {
    if (!startDate || !endDate || !startTime || !endTime) return;
    setIsLoading(true);
    setShowConfirmation(true);
    // Simulated API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const ampm = hour < 12 ? "AM" : "PM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute} ${ampm}`;
  });

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <Image
              src="https://assets-global.website-files.com/5e1e5c62fa3d4447af41798f/5e1e5c62fa3d445b3f417a38_dailypay-logo.svg"
              alt="DailyPay Logo"
              width={180}
              height={40}
              priority
            />
            <h1 className="text-2xl font-bold text-[#FF4D2D]">Manager Portal</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-[#FF4D2D] mb-6">Shift Management</h2>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="w-full bg-[#FF4D2D] hover:bg-[#E63D1F] text-white"
                  size="lg"
                >
                  Create New Shift
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Shift</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Time</label>
                    <Select onValueChange={setStartTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Time</label>
                    <Select onValueChange={setEndTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handlePost}
                    disabled={!startDate || !endDate || !startTime || !endTime || isLoading}
                    className="w-full bg-[#FF4D2D] hover:bg-[#E63D1F] text-white"
                  >
                    Post Shift
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
              <DialogContent className="sm:max-w-[425px]">
                <div className="flex flex-col items-center justify-center p-4">
                  <Image
                    src="https://assets-global.website-files.com/5e1e5c62fa3d4447af41798f/5e1e5c62fa3d445b3f417a38_dailypay-logo.svg"
                    alt="DailyPay Logo"
                    width={120}
                    height={30}
                    className="mb-6"
                    priority
                  />
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF4D2D]"></div>
                    <p className="text-[#FF4D2D] font-medium">Processing your request...</p>
                  </div>
                  {startDate && startTime && endDate && endTime && (
                    <div className="mt-4 text-sm text-gray-600 text-center">
                      <p>Creating shift from:</p>
                      <p className="font-medium">{format(startDate, 'MMM dd, yyyy')} at {startTime}</p>
                      <p>to</p>
                      <p className="font-medium">{format(endDate, 'MMM dd, yyyy')} at {endTime}</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </main>
  );
}