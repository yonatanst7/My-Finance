import { useState } from "react";
import { auth } from "../firebase/config"; // Adjust the path as needed
import { createUserWithEmailAndPassword } from "firebase/auth";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (email, password, displayName) => {
    setIsLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // Add displayName to the user profile
      await user.updateProfile({ displayName });
      setIsLoading(false);
      return user;
    } catch (err) {
      console.error("Error signing up:", err.message);
      setError(err.message);
      setIsLoading(false);
    }

  };

  return { signup, error, isLoading };
};

export default useSignup;