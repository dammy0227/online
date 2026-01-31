import React from "react";
import Slider from "react-slick";

const testimonials = [
  {
    id: 1,
    name: "Adaobi Nwachukwu",
    image: "https://i.pravatar.cc/100?img=5",
    message: "This platform made learning React so easy. I could follow step by step!",
    rating: 5,
  },
  {
    id: 2,
    name: "Ibrahim Musa",
    image: "https://i.pravatar.cc/100?img=15",
    message: "The Node.js course gave me the confidence to build my first backend API.",
    rating: 4,
  },
  {
    id: 3,
    name: "Chiamaka Okoro",
    image: "https://i.pravatar.cc/100?img=25",
    message: "Very interactive and easy to understand. Highly recommended!",
    rating: 5,
  },
  {
    id: 4,
    name: "Oluwaseun Adeyemi",
    image: "https://i.pravatar.cc/100?img=35",
    message: "The HTML & CSS basics course really helped me start my journey in tech.",
    rating: 4,
  },
  {
    id: 5,
    name: "Fatima Abdullahi",
    image: "https://i.pravatar.cc/100?img=45",
    message: "The instructors are very professional and always ready to help.",
    rating: 5,
  },
];

const sliderSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
};

const TestimonialCard = ({ t }) => (
  <div className="relative bg-white rounded-2xl p-5 shadow-md mx-3">
    {/* Arrow */}
    <div className="absolute -bottom-4 left-10 w-0 h-0 border-15px border-l-transparent border-r-transparent border-t-white" />

    {/* Header */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-15 h-15 bg-orange-400 rounded-full flex items-center justify-center transition hover:scale-110">
        <img
          src={t.image}
          alt={t.name}
          className="w-12.5 h-12.5 rounded-full object-cover transition hover:scale-110 hover:brightness-75"
        />
      </div>
      <h3 className="font-semibold text-gray-800">{t.name}</h3>
    </div>

    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
      “{t.message}”
    </p>

    <div className="flex justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-lg ${
            i < t.rating ? "text-orange-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="max-w-300 mx-auto px-4 py-12">
      {/* Header */}
      <h2 className="text-2xl  text-orange-600 mb-2">
        Testimonials
      </h2>
      <p className="text-gray-600 mb-6">
        Hear what our students have to say!
      </p>

      {/* 🔹 MOBILE & TABLET — Horizontal Scroll */}
      <div
        className="
          flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3
          lg:hidden
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="min-w-[90%] snap-start"
          >
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>

      {/* 🔸 LARGE SCREEN — React Slick */}
      <div className="hidden lg:block">
        <Slider {...sliderSettings}>
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
