import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const verifyToken = async (token) => {
  console.log("token verified")
  try {
    const response = await fetch(`http://localhost:8000/auth/verify-token/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return alert(data.error || 'Something went wrong');
    }
console.log(data)
    return data.user;  
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;  
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const login = (data) => {
    const { user, token } = data;
    localStorage.setItem("token", token); 
    setUser(user); 
  };

 
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");  
  };


  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setUser(null); 
        setLoading(false);
        navigate("/"); 
        return;
      }
      const userData = await verifyToken(token);  

      if (userData) {
        console.log(userData.email)
        setUser(userData.email.split('@')[0]); 
setLoading(false);
        navigate("/admin"); 
      } else {
        localStorage.removeItem("token"); 
        setUser(null);
        setLoading(false);
        navigate("/");  
      }
    };

    checkToken();  
  }, [token, navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  
  return (
    <AuthContext.Provider value={{ login, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
