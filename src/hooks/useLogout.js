import pb from "lib/pocketbase";
import { useState } from "react";

export default function useLogout() {
  const [refresh, setRefresh] = useState(true); // Used to render after logout clicked
  function logout() {
    pb.authStore.clear();
    setRefresh((prevCheck) => !prevCheck);
  }

  return logout;
}
