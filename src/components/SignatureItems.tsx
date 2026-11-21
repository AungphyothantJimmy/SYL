import React from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import { asset } from "../lib/defaults";
import { formatPrice } from "../lib/format";
import { resolveImage } from "../lib/images";
import type { Product } from "../lib/types";

type Props = {
  items: Product[];
  showAllButton?: boolean;
  /** Maximum number of items to display. Defaults to 8. Pass 0 for no limit. */
  maxItems?: number;
  /** Override the section heading (e.g. collection title). */
  heading?: string;
  /** Override the subheading; pass "" to hide it. */
  subheading?: string;
  /** Message shown when there are no items. */
  emptyMessage?: string;
};

const SignatureItems: React.FC<Props> = ({
  items,
  showAllButton,
  maxItems = 8,
  heading,
  subheading,
  emptyMessage,
}) => {
  const navigate = useNavigate();
  const { data } = useContent();
  const { settings } = data;

  // Never show more than maxItems items in this section (0 = no limit).
  const visibleItems = maxItems ? items.slice(0, maxItems) : items;

  const resolvedHeading = heading ?? settings.signature_heading;
  const resolvedSubheading =
    subheading !== undefined ? subheading : settings.signature_subheading;

  return (
    <section
      className="relative py-16 px-4 md:px-6 overflow-hidden"
      style={{ backgroundColor: "oklch(0.94 0.02 230)" }}
    >
      <h2 className="text-center text-4xl md:text-6xl font-bold leading-tight">
        <span className="gold-glow">{resolvedHeading}</span>
      </h2>

      {resolvedSubheading && (
        <p className="text-center text-gray-600 mt-3 max-w-xl mx-auto text-base md:text-lg whitespace-pre-line">
          {resolvedSubheading}
        </p>
      )}

      {/* Items Grid — wraps and centers the last row for any item count */}
      <div className="mt-6 flex w-full max-w-7xl mx-auto flex-wrap justify-center gap-4">
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-1.25rem)] md:w-[calc(33.333%-1.667rem)] text-center overflow-hidden px-2"
          >
            <img
              src={resolveImage(
                item.image_url,
                asset(`s${(index % 12) + 1}.jpg`),
              )}
              alt={item.name}
              className="rounded-lg shadow-lg mx-auto h-64 w-full object-cover"
            />

            <h3 className="text-lg md:text-xl font-semibold mt-2 text-black">
              {item.name}
            </h3>

            {item.category && (
              <p className="text-sm uppercase tracking-wide text-gray-500 mt-1">
                {item.category}
              </p>
            )}

            <p className="text-gray-700 mt-1">{formatPrice(item.price)}</p>

            <button
              className="mt-2 px-5 py-2 border border-black rounded-md text-black
                         hover:bg-black hover:text-white
                         hover:scale-105 transition-all duration-300"
              onClick={() => navigate(`/item/${item.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {visibleItems.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          {emptyMessage ?? "No items available yet."}
        </p>
      )}

      {showAllButton && (
        <div className="mt-10 text-center">
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
