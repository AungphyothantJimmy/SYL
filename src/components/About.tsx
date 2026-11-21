import React from "react";
import { useContent } from "../context/ContentContext";
import { asset } from "../lib/defaults";
import { resolveImage } from "../lib/images";

const statColor: Record<string, string> = {
  green: "text-green-600",
  blue: "text-blue-500",
  yellow: "text-yellow-500",
  red: "text-red-500",
  purple: "text-purple-500",
  gray: "text-gray-600",
};

const About: React.FC = () => {
  const { data } = useContent();
  const { settings } = data;

  return (
    <section
      className="relative py-16 px-4 md:px-6 overflow-hidden"
      style={{ backgroundColor: "oklch(0.94 0.02 150)" }}
    >
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 bg-clip-text text-transparent">
            {settings.about_title}
          </h2>

          <div className="text-gray-700 mt-5 leading-relaxed text-base md:text-lg whitespace-pre-line bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent">
            {settings.about_body}
          </div>

          <div className="flex flex-wrap justify-between gap-4 mt-10">
            {settings.about_stats.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className="flex-1 min-w-[120px] rounded-xl p-4 text-center bg-white/40 backdrop-blur-md border border-white/50 shadow-lg"
              >
                <p
                  className={`text-2xl md:text-3xl font-bold ${
                    statColor[stat.color] ?? statColor.green
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-400/30 to-rose-500/30 blur-2xl"
          />
          <img
            src={resolveImage(settings.about_image_url, asset("nla.png"))}
            alt="Craftsman"
            className="relative w-full rounded-2xl shadow-2xl object-cover border border-white/40"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
