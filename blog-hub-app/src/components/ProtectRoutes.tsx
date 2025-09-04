  import { Navigate } from "react-router-dom";
  import { getCurrentUser } from "../utils/auth";

  interface ProtectedRouteProps {
    children: React.JSX.Element;
  }

  const ProtectedRoute = ({
    children,
  }: ProtectedRouteProps): React.JSX.Element => {
    const user = getCurrentUser();
    if (!user) return <Navigate to='/login' replace />;
    return children;
  };

  export default ProtectedRoute;
