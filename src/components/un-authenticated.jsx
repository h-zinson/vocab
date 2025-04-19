import { Navigate } from "react-router";
import { useAuth } from "../hooks/use-auth";

export default function UnAuthenticatedRoute({ children, redirectTo = "/" }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
