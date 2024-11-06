import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../lib/db";

export function useSnapshot<T>(
  collectionName: string,
  docRefId: string | undefined | null,
) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!docRefId) return;
    const unsub = onSnapshot(
      doc(db, collectionName + docRefId),
      (snapshot) => {
        setData(snapshot.data() as any);
      },
      (error) => {
        console.error("Error fetching Firestore data:", error);
      },
    );

    return unsub;
  }, [collectionName, docRefId]);

  return data;
}
