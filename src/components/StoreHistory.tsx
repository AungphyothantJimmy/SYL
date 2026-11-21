import React from "react";
import { useContent } from "../context/ContentContext";
import { asset } from "../lib/defaults";
import { resolveImage } from "../lib/images";

const StoreHistory: React.FC = () => {
  const { data } = useContent();
  const { settings } = data;

  return (
    <section
      className="relative py-16 px-4 md:px-6 overflow-hidden"
      style={{ backgroundColor: "oklch(0.94 0.02 230)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-rose-400/20 blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 bg-clip-text text-transparent">
            {settings.store_history_title}
          </h2>

          <div className="text-gray-700 mt-5 leading-relaxed text-base md:text-lg whitespace-pre-line bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent">
            {settings.store_history_body}
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-rose-400/30 to-amber-500/30 blur-2xl"
          />
          <img
            src={resolveImage(
              settings.store_history_image_url,
              asset("nla.png"),
            )}
            alt="Our store history"
            className="relative w-full rounded-2xl shadow-2xl object-cover border border-white/40"
          />
        </div>
      </div>
    </section>
  );
};

export default StoreHistory;
