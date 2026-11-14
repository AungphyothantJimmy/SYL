import React from "react";
import { useContent } from "../context/ContentContext";
import { asset } from "../lib/defaults";
import { resolveImage } from "../lib/images";

function linkToProps(link: string) {
  const isExternal = /^https?:\/\//i.test(link);
  const path = link.replace(/^#/, "");
  return {
    href: isExternal ? link : `#${path.startsWith("/") ? path : `/${path}`}`,
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noopener noreferrer" : undefined,
  };
}

const Featured: React.FC = () => {
  const { data } = useContent();
  const { settings, featured } = data;

  return (
    <section
      className="py-16 px-4 md:px-6 overflow-hidden"
      style={{ backgroundColor: "oklch(0.923 0.003 48.717)" }}
    >
      <h2 className="text-center text-3xl md:text-4xl font-bold text-black">
        {settings.featured_heading}
      </h2>

      <p className="text-center text-gray-600 mt-2 px-2 md:px-0 whitespace-pre-line">
        {settings.featured_subheading}
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {featured.map((collection, index) => (
          <div
            key={collection.id}
            className="text-center md:text-left overflow-hidden"
          >
            <img
              src={resolveImage(
                collection.image_url,
                asset(`f${(index % 3) + 1}.png`),
              )}
              alt={collection.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <h3 className="text-lg md:text-xl font-semibold mt-4 text-black">
              {collection.title}
            </h3>
            <p className="text-gray-600 mt-1">{collection.description}</p>
            <a
              className="mt-3 inline-block font-medium text-blue-500 hover:text-green-900 hover:translate-x-1 transition-all duration-300"
              {...linkToProps(collection.link)}
            >
              Explore Collection →
            </a>
          </div>
        ))}
      </div>

      {featured.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No featured collections yet.
        </p>
      )}
    </section>
  );
};

export default Featured;
