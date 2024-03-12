import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    isAuthenticated: false,
  });

  const [isLouding, setIsLouding] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("login");
    const email = user.split(":")[0];

    if (user) {
      setCurrentUser({
        email,
        isAuthenticated: true,
      });
    }
  }, []);

  console.log(currentUser);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLouding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
