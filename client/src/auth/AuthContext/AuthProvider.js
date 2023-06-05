import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [checkAuth, setCheckAuth] = useState(false);
  const [user, setUser] = useState({});



  let check = window.localStorage.getItem("token");
    
  

  
  const url = `http://localhost:5000/findUser/${check}`;

  const { data: findUser = [check] } = useQuery({
    queryKey: [check],
    queryFn: async () => {
     
      const res = await fetch(url);
      const data = await res.json();
      setUser(data.user);
      return data;
      
      
    },
  });
   


  useEffect(() => {
    if (check) {
      setCheckAuth({
        token: check,
        isAuth:true
      });}
  }, []);
  

  const logout = ()=>{
    setCheckAuth(false);
    window.localStorage.removeItem("token");
  }
  const authInfo = {
    checkAuth, 
    setCheckAuth,
    logout,
    user,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
