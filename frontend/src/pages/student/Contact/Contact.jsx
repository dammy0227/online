import React from "react";

const Contact = () => {
  return (
    <section className="w-full  py-12 flex justify-center px-4">
      <div className="w-full h-screen  rounded-2xl shadow-xl md:h-[90vh] flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Image */}
        <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto">
          <img
            src="https://i.pinimg.com/1200x/d5/a7/92/d5a792caa589947a170f281059122166.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover object-center brightness-90"
          />
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col  bg-linear-to-br from-gray-50 to-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-3 text-center lg:text-left">
            Contact Us
          </h2>

          <p className="text-gray-600 mb-6 text-center lg:text-left">
            We’d love to hear from you! Fill out the form below.
          </p>

          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm
                  focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm
                  focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm resize-none
                  focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg
                transition transform hover:-translate-y-0.5 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
