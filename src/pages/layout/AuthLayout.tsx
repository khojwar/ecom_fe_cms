
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/auth.context";

export default function AuthLayout() {

  const { loggedInUser } = useAuth();

  if (loggedInUser) {
    return <Navigate to={`/${loggedInUser.role}`} />
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <Outlet />
      </div>
    </div>
  );
}