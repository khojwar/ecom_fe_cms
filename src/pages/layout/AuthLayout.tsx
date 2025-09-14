
import { Outlet } from "react-router";

export default function AuthLayout() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <Outlet />
      </div>
    </div>
  );
}