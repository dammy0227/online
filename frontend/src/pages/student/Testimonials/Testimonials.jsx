import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Adaobi Nwachukwu",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/100?img=5",
    message: "This platform made learning React so easy. I could follow step by step! Within 3 months of completing the course, I landed my dream job as a frontend developer.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ibrahim Musa",
    role: "Backend Engineer",
    image: "https://i.pravatar.cc/100?img=15",
    message: "The Node.js course gave me the confidence to build my first backend API. Now I'm working on enterprise-level applications and mentoring junior developers.",
    rating: 4,
  },
  {
    id: 3,
    name: "Chiamaka Okoro",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/100?img=25",
    message: "Very interactive and easy to understand. Highly recommended! The practical projects helped me build a stunning portfolio that got me hired.",
    rating: 5,
  },
  {
    id: 4,
    name: "Oluwaseun Adeyemi",
    role: "Full Stack Developer",
    image: "https://i.pravatar.cc/100?img=35",
    message: "The HTML & CSS basics course really helped me start my journey in tech. Now I'm building full-stack applications and loving every moment.",
    rating: 4,
  },
  {
    id: 5,
    name: "Fatima Abdullahi",
    role: "Data Analyst",
    image: "https://i.pravatar.cc/100?img=45",
    message: "The instructors are very professional and always ready to help. The community support is amazing! I've made valuable connections and friends.",
    rating: 5,
  },
  {
    id: 6,
    name: "Emeka Okafor",
    role: "DevOps Engineer",
    image: "https://i.pravatar.cc/100?img=55",
    message: "The DevOps course was comprehensive and practical. I was able to implement CI/CD pipelines at my company immediately after completing the course.",
    rating: 5,
  },
];

const TestimonialCard = ({ t }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl h-full flex flex-col border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 mx-2 sm:mx-3 lg:mx-4"
  >
    {/* Quote Icon */}
    <FaQuoteLeft className="absolute top-4 right-4 sm:top-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 text-orange-200" />

    {/* Header */}
    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className="relative shrink-0">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-linear-to-r from-orange-500 to-amber-500 p-1">
          <img
            src={t.image}
            alt={t.name}
            className="w-full h-full rounded-full object-cover border-2 border-white"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">{t.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 truncate">{t.role}</p>
      </div>
    </div>

    {/* Message */}
    <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed flex-1 line-clamp-4 sm:line-clamp-none">
      “{t.message}”
    </p>

    {/* Rating */}
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex gap-0.5 sm:gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              i < t.rating ? "text-amber-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-xs sm:text-sm font-semibold text-gray-900">{t.rating}.0</span>
    </div>
  </motion.div>
);

// Custom Arrow Components for Slick Slider (Desktop only)
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-4 lg:-left-6 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-orange-500 hover:text-orange-600 transition-all duration-300 hover:scale-110"
  >
    <FaArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-orange-500 hover:text-orange-600 transition-all duration-300 hover:scale-110"
  >
    <FaArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
  </button>
);

// Slick Slider Settings - Only for Desktop
const sliderSettings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        // On mobile, we'll hide the slider and use horizontal scroll instead
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Testimonials = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-linear-to-b from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 sm:w-80 sm:h-80 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-orange-100 text-orange-600 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Student Success Stories
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            What Our{' '}
            <span className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Students
            </span>{' '}
            Say
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Join thousands of satisfied learners who have transformed their careers with MyAcademy
          </p>
        </motion.div>

        {/* Stats - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-16">
          {[
            { value: '10K+', label: 'Students', delay: 0 },
            { value: '500+', label: 'Courses', delay: 0.1 },
            { value: '4.8', label: 'Avg Rating', delay: 0.2 },
            { value: '98%', label: 'Satisfaction', delay: 0.3 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Mobile & Tablet: Horizontal Scroll (Visible only on screens below lg) */}
        <div className="block lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-6 px-2 -mx-2 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex-none w-[85%] sm:w-[45%] md:w-[40%] snap-start"
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
          
          {/* Scroll Indicator for Mobile */}
          <div className="flex justify-center gap-2 mt-4 lg:hidden">
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-linear-to-r from-orange-500 to-amber-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Desktop: Slick Slider (Visible only on lg and above) */}
        <div className="hidden lg:block testimonial-slider">
          <Slider {...sliderSettings}>
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </Slider>
        </div>
      </div>

      {/* Custom CSS for Slider and Scrollbar */}
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        /* Slick Slider Dots Styling - Desktop Only */
        @media (min-width: 1024px) {
          :global(.testimonial-slider .slick-dots) {
            bottom: -40px;
          }
          :global(.testimonial-slider .slick-dots li button:before) {
            font-size: 12px;
            color: #f97316;
            opacity: 0.25;
          }
          :global(.testimonial-slider .slick-dots li.slick-active button:before) {
            opacity: 1;
            color: #f97316;
          }
          :global(.testimonial-slider .slick-track) {
            display: flex;
            padding: 20px 0;
          }
        }

        /* Smooth scrolling for mobile */
        .snap-mandatory {
          scroll-snap-type: x mandatory;
        }
        
        .snap-start {
          scroll-snap-align: start;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;