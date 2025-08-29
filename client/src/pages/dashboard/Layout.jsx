import { Outlet } from "react-router-dom";
import NavbarOwner from "../../components/dashboard/NavbarOwner";
import SideBar from "../../components/dashboard/SideBar";

export default function Layout() {
  return <div className="flex flex-col">
    <NavbarOwner/>
    <div className="flex">
      <SideBar/>
      <Outlet/>
    </div>
  </div>;
}
