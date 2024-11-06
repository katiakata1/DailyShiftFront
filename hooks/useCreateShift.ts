import { toTimestamp } from "@/lib/db";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import db from "../lib/db";

export interface Shift {
  startTime: Date | Timestamp;
  endTime: Date | Timestamp;
  description: string;
  payMultiplier: number;
  employeeId: string;
}

const useCreateShift = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addShift = async (shift: Shift) => {
    setLoading(true);
    setError(null);
    console.log(shift);
    shift.startTime ??= toTimestamp(shift.startTime);
    shift.endTime ??= toTimestamp(shift.endTime);
    console.log(shift);
    try {
      const docRef = await addDoc(collection(db, "shift"), shift);
      console.log("Document written with ID: ", docRef.id);
    } catch (e: any) {
      console.error("Error adding document: ", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { createShift: addShift, loading, error };
};

export default useCreateShift;
