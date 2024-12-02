import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  
  if (!authToken) {
    alert("Login First")
    return <Navigate to="/login" />;
  }
  
  return children;
};