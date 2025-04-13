import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, where, query } from "firebase/firestore";

export const useCollection = ({collectionName, _query}) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  const queryParams = useRef(_query).current;

  useEffect(() => {
    let ref = collection(db, collectionName);

    if (queryParams) {
      ref = query(ref, where(...queryParams));
    }

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
      setError(null);
    }, (error) => {
      console.error("Firestore error:", error);
      setError("Could not fetch the documents");
    });

    return () => unsubscribe();
  }, [collectionName, queryParams]);

  return { documents, error };
}