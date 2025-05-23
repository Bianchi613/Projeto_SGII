import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
