import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import Layout from "./pages/dashboard/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import AddCar from "./pages/dashboard/AddCar";
import ManageCars from "./pages/dashboard/ManageCars";
import MangeBookings from "./pages/dashboard/MangeBookings";
import Login from "./components/Login";

import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

export default function App() {
  const { showLogin } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <>
      <Toaster />
      {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}
      <Routes>
        {/* CUSTOMER/USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* OWNER/DASHBOARD ROUTES */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<MangeBookings />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  );
}

//todo: 08:45:30
