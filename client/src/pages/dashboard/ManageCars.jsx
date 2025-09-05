import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/dashboard/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export default function ManageCars() {
  const { axios, isOwner, currency } = useAppContext();

  const [cars, setCars] = useState([]);

  async function fetchOwnerCars() {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  }

  async function toggleAvailabilty(carId) {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  }

  async function deleteCar(carId) {
    try {
      const confirm = window.confirm("⚠️ Sure you wanna remove this car?"); // confirmation pop-up
      if (!confirm) return null;
      const { data } = await axios.post("/api/owner/delete-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  }

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      {/* Title */}
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details or remove them from booking platforms."
      />
      {/* Table */}
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr className="">
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {cars.map((car, idx) => (
              <tr key={idx} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt=""
                    className="h-12 w-12 aspect-square rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.seating_capacity} ▪ {car.transmission}
                    </p>
                  </div>
                </td>
                <td className="p-3 max-md:hidden">{car.category}</td>
                <td className="p-3">
                  {currency}
                  {car.pricePerDay}/day
                </td>
                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      car.isAvailable
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    }`}>
                    {car.isAvailable ? "Avilable" : "Unavailable"}
                  </span>
                </td>
                <td className="p-3 flex items-center">
                  <img
                    onClick={() => toggleAvailabilty(car._id)}
                    src={
                      car.isAvailable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt="eye-icon"
                    className="cursor-pointer"
                  />
                  <img
                    onClick={() => deleteCar(car._id)}
                    src={assets.delete_icon}
                    alt="delete-icon"
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
