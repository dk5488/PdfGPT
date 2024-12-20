import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const ProtectedRoute = ({ children }) => {
  const authToken = useSelector((state) => state.setter.value);
  console.log("state token::",authToken)
  const localauthToken=localStorage.getItem("authToken")
  if (!authToken && !localauthToken) {
    //alert("Login First")
    return <Navigate to="/login" />;
  }
  
  return children;
};