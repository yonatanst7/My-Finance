import { useState } from "react";
import { auth } from "../firebase/config"; // Adjust the path as needed
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (email, password, displayName) => {
    setIsLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // Add displayName to the user profile for firebase v11.6.0
      await updateProfile(user, { displayName });
      console.log("User signed up:", user);
      setIsLoading(false);
      return user;
    } catch (err) {
      console.error("Error signing up:", err.code);
      setError(err.code);
      setIsLoading(false);
    }

  };

  return { signup, error, isLoading };
};