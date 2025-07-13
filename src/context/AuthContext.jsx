import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../service/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ userData, setUserData] =useState(null);
  const navigate = useNavigate();
  const logOut = async()=>{
    try{
      await signOut(auth);
      toast.success('bye ' + userData.username);
      navigate('/')
    }catch (err){
      toast.err('Logout failed');
      console.error('Logout error', err);
    }
  }
  useEffect(()=>{ //listener for firebase auth changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser)=>{
      setUser(currentUser);
      if(currentUser){
        const q = query(collection(db,'users'), where('uid', '==', currentUser.uid));
        const snapshot = await getDocs(q);
        if (!snapshot.empty){
          setUserData(snapshot.docs[0].data());
        }
      }else{
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return(
    <AuthContext.Provider value={{ user, userData, logOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
