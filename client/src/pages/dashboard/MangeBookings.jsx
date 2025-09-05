import { useEffect, useState } from "react";
import Title from "../../components/dashboard/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function MangeBookings() {
  const { currency, axios } = useAppContext();

  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner");
      if (data.success) {
        toast.success(data.message);
        setBookings(data.bookings);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/update-status", {
        bookingId,
        status,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      {/* Title */}
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests and manage booking statuses."
      />
      {/* Table */}
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr className="">
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {bookings.map((booking, idx) => (
              <tr
                key={idx}
                className="border-t border-borderColor text-gray-500">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    alt="booking-car-image"
                    className="w-12 h-12 aspect-square rounded-md object-cover"
                  />
                  <p className="font-medium max-md:hidden">
                    {booking.car.brand} {booking.car.model}
                  </p>
                </td>
                <td className="p-3 max:md:hidden">
                  {booking.pickupDate.split("T")[0]} to{" "}
                  {booking.returnDate.split("T")[0]}
                </td>
                <td className="p-3">
                  {currency}
                  {booking.price}
                </td>
                <td className="p-3 max:md:hidden">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                    offline
                  </span>
                </td>
                <td className="p-3">
                  {booking.status === "pending" ? (
                    <select
                      onChange={(evt) =>
                        changeBookingStatus(booking._id, evt.target.value)
                      }
                      value={booking.status}
                      className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none">
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-500 text-red-500"
                      }`}>
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MangeBookings;
