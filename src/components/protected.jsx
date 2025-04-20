import { Navigate } from "react-router";
import { useAuth } from "../hooks/use-auth";

export default function ProtectedRoute({ children, redirectTo = "/login" }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
