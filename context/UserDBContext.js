import { createContext, useContext, useState } from "react";

const UserDBContext = createContext();

export function UserDBContextWrapper({ children }) {
  const [userDB, setUserDB] = useState(null);

  return (
    <UserDBContext.Provider value={[userDB, setUserDB]}>
      {children}
    </UserDBContext.Provider>
  );
}

export function useUserDBContext() {
  return useContext(UserDBContext);
}
