import React from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram,
  FaGooglePlay, 
  FaAppStoreIos,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-4">MyAcademy</h3>
            <p className="text-gray-400 text-sm">
              Empowering learners with quality education accessible from anywhere.
            </p>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-bold mb-4">Courses</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-orange-400">Web Development</a></li>
              <li><a href="#" className="hover:text-orange-400">Data Science</a></li>
              <li><a href="#" className="hover:text-orange-400">Mobile App Dev</a></li>
              <li><a href="#" className="hover:text-orange-400">Cybersecurity</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <FaPhone className="text-orange-400" /> +234 800 765 4321
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-orange-400" /> support@MyAcademy.com
              </p>
            </div>
          </div>

          {/* Social & App */}
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="text-gray-400 hover:text-orange-400">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400">
                <FaInstagram size={20} />
              </a>
            </div>
            <div className="space-y-2">
              <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg w-full">
                <FaGooglePlay /> Google Play
              </button>
              <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg w-full">
                <FaAppStoreIos /> App Store
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>© 2025 MyAcademy. All Rights Reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;