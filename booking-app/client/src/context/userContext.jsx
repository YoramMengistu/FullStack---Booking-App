import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      axios
        .get("http://localhost:5000/profile", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(({ data }) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {/* {children} */}
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
}
