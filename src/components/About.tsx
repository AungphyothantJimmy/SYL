import React from "react";
import crafting from "../images/nla.png";

const About: React.FC = () => {
  return (
    <section
      className="py-16 px-4 md:px-6 overflow-hidden"
      style={{ backgroundColor: "oklch(0.923 0.003 48.717)" }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-black leading-tight">
            Crafting Beauty with Passion
          </h2>

          <p className="text-gray-700 mt-5 leading-relaxed text-base md:text-lg">
            As a recent founder and dedicated crafter, I create jewelry that
            reflects individuality and timeless elegance. Each piece is
            thoughtfully designed and handcrafted, blending artistic vision with
            precision.
          </p>

          <p className="text-gray-700 mt-5 leading-relaxed text-base md:text-lg">
            Every gemstone is handpicked for its sparkle and character. Every
            setting is crafted with care, making each piece as unique as the
            person who wears it.
          </p>

          {/* Stats - subtle containers */}
          <div className="flex flex-wrap justify-between gap-4 mt-10">
            <div className="flex-1 min-w-[120px] bg-white/20 rounded-lg p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-green-600">
                Quality Materials
              </p>
            </div>

            <div className="flex-1 min-w-[120px] bg-white/20 rounded-lg p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-blue-500">
                Customer Delight
              </p>
            </div>

            <div className="flex-1 min-w-[120px] bg-white/20 rounded-lg p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-yellow-500">
                500+ Designs
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <img
          src={crafting}
          alt="Craftsman"
          className="w-full rounded-2xl shadow-xl object-cover"
        />
      </div>
    </section>
  );
};

export default About;
