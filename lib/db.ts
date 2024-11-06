import app from "./firebase";
import { getFirestore, Timestamp } from "firebase/firestore";
const db = getFirestore(app);
export default db;

export function toTimestamp(date: Date): Timestamp {
  return Timestamp.fromDate(date);
}
