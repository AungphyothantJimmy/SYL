import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, LayoutGrid, Phone } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { asset } from "../lib/defaults";
import { formatPrice } from "../lib/format";
import { resolveImage } from "../lib/images";

const PageBackground = "oklch(0.923 0.003 48.717)";

const ItemDetailPage: React.FC = () => {
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

  const product = data.products.find((item) => item.id === id);

  if (!product) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center"
        style={{ backgroundColor: PageBackground }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Item not found
        </h1>
        <p className="max-w-md text-gray-600">
          This piece may have been removed or is no longer available.
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

  const { settings } = data;
  const fallbackImage = asset(`s${(((product.sort_order - 1) % 12) + 12) % 12 + 1}.jpg`);
  const image = resolveImage(product.image_url, fallbackImage);
  const related = data.products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: PageBackground }}
    >
      {/* Top navigation */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6 md:px-6">
        <button
          className="flex items-center gap-2 border border-gray-800 px-4 py-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/all-items")}
        >
          <LayoutGrid size={16} />
          All Items
        </button>
      </div>

      {/* Product details */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <img
            src={image}
            alt={product.name}
            className="w-full max-h-[560px] rounded-2xl shadow-xl object-cover"
          />

          <div>
            {product.category && (
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                {product.category}
              </p>
            )}

            <h1 className="mt-2 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl md:text-3xl font-semibold text-amber-600">
              {formatPrice(product.price)}
            </p>

            <div className="mt-8 border-t border-gray-300 pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Details
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description?.trim()
                  ? product.description
                  : "Contact us for more information about this handcrafted piece."}
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {settings.contact_phone && (
                <a
                  href={`tel:${settings.contact_phone}`}
                  className="flex items-center justify-center gap-2 border border-black px-6 py-3 rounded-md text-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
                >
                  <Phone size={18} />
                  Call to Enquire
                </a>
              )}

              <button
                className="bg-black text-white px-6 py-3 rounded-md shadow-md hover:opacity-90 hover:scale-105 hover:shadow-lg transition-all duration-300"
                onClick={() => navigate("/all-items")}
              >
                Shop Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related items */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
            You May Also Like
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map((item) => (
              <button
                key={item.id}
                className="group text-left"
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <img
                  src={resolveImage(
                    item.image_url,
                    asset(`s${(((item.sort_order - 1) % 12) + 12) % 12 + 1}.jpg`),
                  )}
                  alt={item.name}
                  className="h-40 md:h-48 w-full rounded-lg shadow-md object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="mt-3 font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {formatPrice(item.price)}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ItemDetailPage;
