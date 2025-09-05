import { Outlet } from "react-router-dom";
import NavbarOwner from "../../components/dashboard/NavbarOwner";
import SideBar from "../../components/dashboard/SideBar";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

export default function Layout() {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner, navigate]);

  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
