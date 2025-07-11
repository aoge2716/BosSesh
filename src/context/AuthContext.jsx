import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../service/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(()=>{ //listener for firebase auth changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return(
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
