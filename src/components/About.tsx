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
      className="py-16 px-4 md:px-6 overflow-hidden"
      style={{ backgroundColor: "oklch(0.923 0.003 48.717)" }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-black leading-tight">
            {settings.about_title}
          </h2>

          <div className="text-gray-700 mt-5 leading-relaxed text-base md:text-lg whitespace-pre-line">
            {settings.about_body}
          </div>

          <div className="flex flex-wrap justify-between gap-4 mt-10">
            {settings.about_stats.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className="flex-1 min-w-[120px] bg-white/20 rounded-lg p-4 text-center"
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

        <img
          src={resolveImage(settings.about_image_url, asset("nla.png"))}
          alt="Craftsman"
          className="w-full rounded-2xl shadow-xl object-cover"
        />
      </div>
    </section>
  );
};

export default About;
