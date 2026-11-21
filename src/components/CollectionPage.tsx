import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import { useContent } from "../context/ContentContext";
import BackButton from "./BackButton";
import { asset } from "../lib/defaults";
import { resolveImage } from "../lib/images";

const PageBackground = "oklch(0.923 0.003 48.717)";

const CollectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading } = useContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: PageBackground }}
      >
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
      </div>
    );
  }

  const collection = data.featured.find((item) => item.id === id);

  if (!collection) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center"
        style={{ backgroundColor: PageBackground }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Collection not found
        </h1>
        <p className="max-w-md text-gray-600">
          This collection may have been removed or renamed.
        </p>
        <button
          className="mt-2 bg-black text-white px-6 py-3 rounded-md shadow-md hover:opacity-90 hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/all-items")}
        >
          Browse All Items
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: PageBackground }}>
      {/* Top navigation */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6 md:px-6">
        <BackButton />
        <button
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/all-items")}
        >
          <LayoutGrid size={16} />
          All Items
        </button>
      </div>

      {/* Collection detail */}
      <section className="mx-auto max-w-4xl px-4 pb-16 md:px-6">
        {collection.image_url && (
          <img
            src={resolveImage(collection.image_url, asset("f1.png"))}
            alt={collection.title}
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl mt-8"
          />
        )}

        <div className="text-center mt-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 bg-clip-text text-transparent leading-tight">
            {collection.title}
          </h1>

          {collection.description?.trim() && (
            <p className="mt-4 text-base md:text-lg text-gray-600 whitespace-pre-line max-w-2xl mx-auto">
              {collection.description}
            </p>
          )}

          <button
            className="mt-8 bg-black text-white px-6 py-3 rounded-md shadow-md hover:opacity-90 hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={() => navigate("/all-items")}
          >
            Browse All Items
          </button>
        </div>
      </section>
    </div>
  );
};

export default CollectionPage;
