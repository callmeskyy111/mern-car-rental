import Title from "./Title";
import { assets } from "../assets/assets";

function Testimonial() {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonal:
        "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    },
    {
      name: "Liam Johnson",
      location: "Toronto, Canada",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      testimonal:
        "CarRental made my trip stress-free. The booking process was simple and the car was in perfect condition.",
    },
    {
      name: "Sophia Müller",
      location: "Berlin, Germany",
      image: assets.testimonial_image_2,
      testimonal:
        "I highly recommend CarRental! Affordable prices, excellent support, and a smooth overall experience.",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subTitle="Discover why discerning car-fanatics from around the globe choose CarRental for meeting their expectations."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <>
                    <img src={assets.star_icon} alt="star-icon" key={index} />
                    {/* <Star key={index} filled={testimonial.rating > index} /> */}
                  </>
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonal}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
