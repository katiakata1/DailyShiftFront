import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../lib/db";

export function useSnapshot<T>(collectionName: string) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(newData);
        setData(newData as any);
      },
      (error) => {
        console.error("Error fetching Firestore data:", error);
      },
    );

    return unsub;
  }, [collectionName]);

  return data;
}
