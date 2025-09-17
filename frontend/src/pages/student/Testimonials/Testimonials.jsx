import React from "react";
import "./Testimonials.css";

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
  {
    id: 6,
    name: "Emeka Johnson",
    image: "https://i.pravatar.cc/100?img=55",
    message: "Loved the flexibility — I could learn at my own pace and schedule.",
    rating: 4,
  },
  {
    id: 7,
    name: "Grace Owolabi",
    image: "https://i.pravatar.cc/100?img=65",
    message: "The community is amazing, I made new friends while learning!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <p className="subtitle">Hear what our students have to say!</p>

      <div className="testimonial-scroll">
        {testimonials.map((t) => (
          <div key={t.id} className="testimonial-card">
<div className="card-header">
  <div className="img-wrapper">
    <img src={t.image} alt={t.name} className="student-img" />
  </div>
  <h3>{t.name}</h3>
</div>


            <p className="message">“{t.message}”</p>

            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < t.rating ? "star filled" : "star"}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
