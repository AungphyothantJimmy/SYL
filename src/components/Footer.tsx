import { forwardRef } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import logo from "../images/logo.jpg";

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="w-full bg-[#111827] text-white">
      {/* Footer Section */}
      <footer className="bg-[#111827] py-16 px-6 md:px-20 text-gray-300 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          {/* Left Section — Logo, Description, Social */}
          <div className="w-full">
            <div>
              <img
                src={logo}
                alt="Shwe Yadanar Lin Logo"
                className="h-20 w-20 object-cover rounded-full border-2 border-white shadow-md mb-6"
              />
            </div>

            <p className="text-gray-400 mb-6 max-w-md">
              Creating modern elegance since 2022. Your trusted destination for
              beautifully crafted jewelry designed to shine for a lifetime.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-6 text-gray-400 text-xl mt-4">
              <a
                href="https://web.facebook.com/profile.php?id=100063796764466" // <-- replace with your real FB link
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <Facebook size={46} />
              </a>

              <a
                href="https://www.instagram.com/syl__jewelry/" // <-- replace with your real IG link
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <Instagram size={46} />
              </a>
            </div>
          </div>

          {/* Right Section — Contact Info */}
          <div className="w-full">
            <h3 className="font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin size={18} />
                <span>
                  123 Luxury Avenue, Diamond District, New York, NY 10036
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <Phone size={18} />
                <span>+95 9 775 815814</span>
              </li>

              <li className="flex items-center space-x-3">
                <Mail size={18} />
                <span>info@jewelrystore.com</span>
              </li>

              <li className="flex items-start space-x-3">
                <Clock size={18} />
                <span>
                  Mon - Sat: 10:00 AM - 7:00 PM <br />
                  Sunday: 12:00 PM - 5:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default Footer;
