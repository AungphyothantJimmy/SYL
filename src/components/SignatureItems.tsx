import React from "react";
import type { SignaturedItem } from "../App";
import { useNavigate } from "react-router-dom";

type Props = {
  items: SignaturedItem[];
  showAllButton?: boolean;
};

const SignatureItems: React.FC<Props> = ({ items, showAllButton }) => {
  const navigate = useNavigate();

  return (
    <section
      className="py-16 px-4 md:px-6 overflow-hidden"
      style={{ backgroundColor: "oklch(0.869 0.005 56.366)" }}
    >
      {/* Title */}
      <h2 className="text-center text-4xl md:text-6xl font-bold text-black leading-tight">
        Signature Items
      </h2>

      <p className="text-center text-gray-600 mt-3 max-w-xl mx-auto text-base md:text-lg">
        Our most loved pieces, crafted with timeless beauty
      </p>

      {/* Items Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {items.map((item) => (
          <div key={item.id} className="text-center overflow-hidden px-2">
            <img
              src={item.image}
              alt={item.name}
              className="rounded-lg shadow-lg mx-auto h-64 w-full object-cover"
            />

            <h3 className="text-lg md:text-xl font-semibold mt-4 text-black">
              {item.name}
            </h3>

            <p className="text-gray-700 mt-1">{item.price}</p>

            <button
              className="mt-4 px-5 py-2 border border-black rounded-md 
                         hover:bg-black hover:text-white 
                         hover:scale-105 transition-all duration-300"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Only show on homepage */}
      {showAllButton && (
        <div className="mt-14 text-center">
          <button
            className="px-8 py-3 bg-black text-white rounded-md 
                       hover:bg-gray-900 hover:scale-105 hover:shadow-lg
                       transition-all duration-300"
            onClick={() => navigate("/all-items")}
          >
            View All Items
          </button>
        </div>
      )}
    </section>
  );
};

export default SignatureItems;
