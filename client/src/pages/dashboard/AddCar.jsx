import { useState } from "react";
import Title from "../../components/dashboard/Title";
import { assets } from "../../assets/assets";

export default function AddCar() {
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const currency = import.meta.env.VITE_CURRENCY;

  async function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability and car specifications."
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl">
        {/* CAR IMAGE */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="car-image"
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(evt) => setImage(evt.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car.</p>
        </div>
        {/* Car Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.brand}
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
              onChange={(evt) => setCar({ ...car, brand: evt.target.value })} // update brand
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.model}
              type="text"
              placeholder="e.g. X5, E-Class, M4..."
              onChange={(evt) => setCar({ ...car, model: evt.target.value })} // update model
              required
            />
          </div>
        </div>
        {/* Car Year, Price, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.year}
              type="number"
              placeholder="2025"
              onChange={(evt) => setCar({ ...car, year: evt.target.value })} // update year
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Daily Price ({currency})</label>
            <input
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.pricePerDay}
              type="number"
              placeholder="100"
              onChange={(evt) =>
                setCar({ ...car, pricePerDay: evt.target.value })
              } // update price/day
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.category}
              onChange={
                (evt) => setCar({ ...car, category: evt.target.value }) // update category
              }>
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>
        {/* Car Transmission, Fuel Type, Seating Capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.transmission}
              onChange={
                (evt) => setCar({ ...car, transmission: evt.target.value }) // update transmission
              }>
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.fuel_type}
              onChange={
                (evt) => setCar({ ...car, fuel_type: evt.target.value }) // update fuel_type
              }>
              <option value="">Select a fuel-type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.seating_capacity}
              type="number"
              placeholder="4"
              onChange={(evt) =>
                setCar({ ...car, seating_capacity: evt.target.value })
              } // update seating_capacity
              required
            />
          </div>
        </div>
        {/* Car Location */}
        <div className="flex flex-col w-full">
          <label>Fuel Type</label>
          <select
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={car.location}
            onChange={
              (evt) => setCar({ ...car, location: evt.target.value }) // update location
            }>
            <option value="">Select a location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Houston">Houston</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>
        {/* Car Description */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows={5}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={car.description}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine..."
            onChange={(evt) =>
              setCar({ ...car, description: evt.target.value })
            } // update description
            required></textarea>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 mt-4 hover:bg-primary-dull bg-primary text-white rounded-md font-medium w-max cursor-pointer">
          <img src={assets.tick_icon} alt="tick-icon" />
          List Your Car
        </button>
      </form>
    </div>
  );
}

