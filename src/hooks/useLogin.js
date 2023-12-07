import pb from "lib/pocketbase";
import { useState } from "react";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  async function login({ username, password }) {
    try {
      setLoading(true);
      const authData = await pb
        .collection("users")
        .authWithPassword(username, password);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  }

  return { login, loading };
}
