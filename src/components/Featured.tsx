import React from "react";
import f1 from "../images/f1.png";
import f2 from "../images/f2.png";
import f3 from "../images/f3.png";

const Featured: React.FC = () => {
  return (
    <section
      className="py-16 px-4 md:px-6 overflow-hidden"
      style={{ backgroundColor: "oklch(0.923 0.003 48.717)" }}
    >
      <h2 className="text-center text-3xl md:text-4xl font-bold text-black">
        Featured Collections
      </h2>

      <p className="text-center text-gray-600 mt-2 px-2 md:px-0">
        Explore our carefully curated collections, each piece designed to
        celebrate life's most precious moments
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Diamond Rings */}
        <div className="text-center md:text-left overflow-hidden">
          <img
            src={f1}
            alt="Diamond Rings"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <h3 className="text-lg md:text-xl font-semibold mt-4 text-black">
            Diamond Rings
          </h3>
          <p className="text-gray-600 mt-1">
            Brilliant cuts that capture eternal love
          </p>
          <a
            className="mt-3 inline-block font-medium text-blue-500 hover:text-green-900 hover:translate-x-1 transition-all duration-300"
            href="#"
          >
            Explore Collection →
          </a>
        </div>

        {/* Necklaces */}
        <div className="text-center md:text-left overflow-hidden">
          <img
            src={f2}
            alt="Necklaces"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <h3 className="text-lg md:text-xl font-semibold mt-4 text-black">
            Necklaces
          </h3>
          <p className="text-gray-600 mt-1">
            Luxurious designs for every occasion
          </p>
          <a
            className="mt-3 inline-block font-medium text-blue-500 hover:text-green-900 hover:translate-x-1 transition-all duration-300"
            href="#"
          >
            Explore Collection →
          </a>
        </div>

        {/* Earrings */}
        <div className="text-center md:text-left overflow-hidden">
          <img
            src={f3}
            alt="Jade Earrings"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <h3 className="text-lg md:text-xl font-semibold mt-4 text-black">
            Jade Earrings
          </h3>
          <p className="text-gray-600 mt-1">
            Classic beauty with modern sophistication
          </p>
          <a
            className="mt-3 inline-block font-medium text-blue-500 hover:text-green-900 hover:translate-x-1 transition-all duration-300"
            href="#"
          >
            Explore Collection →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Featured;
