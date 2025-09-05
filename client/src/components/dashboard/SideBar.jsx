import { NavLink, useLocation } from "react-router-dom";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export default function SideBar() {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();

  const [image, setImage] = useState("");

  async function updateImage() {
    // updating user-image from dashboard
    try {
      const formData = new FormData();
      formData.append("image",image);
      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  }

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
      <div className="group relative">
        <label htmlFor="image">
          <img
            className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1544502062-f82887f03d1c?q=80&w=1259&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="owner-profile-picture"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(evt) => setImage(evt.target.files[0])}
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="edit-icon" />
          </div>
        </label>
      </div>
      {image && (
        <button
          className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer"
          onClick={updateImage}>
          <img src={assets.check_icon} alt="check-icon" width={13} />
          Save
        </button>
      )}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>
      <div className="w-full">
        {ownerMenuLinks.map((menuLink, idx) => (
          <NavLink
            key={idx}
            to={menuLink.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              menuLink.path === location.pathname
                ? "bg-primary/10 text-primary"
                : "text-gray-600"
            }`}>
            <img
              src={
                menuLink.path === location.pathname
                  ? menuLink.coloredIcon
                  : menuLink.icon
              }
              alt="car-icon"
            />
            <span className="max-md:hidden">{menuLink.name}</span>
            <div
              className={`${
                menuLink.path === location.pathname && "bg-primary"
              } w-1.5 h-8 rounded-lg right-0 absolute`}></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
