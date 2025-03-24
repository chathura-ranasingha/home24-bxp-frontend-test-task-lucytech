import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { RootState } from "../store";
import { AppDispatch } from "../store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const storedCredentials = localStorage.getItem("userCredentials");

    if (storedCredentials && !user && !loading) {
      const credentials = JSON.parse(storedCredentials);
      dispatch(loginUser(credentials));
    }
  }, [dispatch, user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Navigate to="/login" replace />;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
