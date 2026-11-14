import React from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import { asset } from "../lib/defaults";
import { resolveImage } from "../lib/images";

interface HomeProps {
  scrollToFooter: () => void;
}

const Home: React.FC<HomeProps> = ({ scrollToFooter }) => {
  const navigate = useNavigate();
  const { data } = useContent();
  const { settings } = data;

  const background = resolveImage(settings.hero_image_url, asset("syl1.jpg"));

  return (
    <section
      className="relative min-h-screen w-full flex items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Store Name */}
      <h2
        className="absolute top-8 left-1/2 -translate-x-1/2
             text-4xl md:text-6xl lg:text-7xl xl:text-8xl
             font-extrabold tracking-widest
             text-transparent bg-clip-text
             bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-500
             drop-shadow-[0_5px_20px_rgba(0,0,0,0.8)]
             font-serif
             whitespace-nowrap"
      >
        {settings.store_name}
      </h2>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-4 md:ml-10">
        <h1 className="text-xl md:text-5xl font-bold text-gray-900 leading-tight whitespace-pre-line">
          {settings.hero_title}
        </h1>

        <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-700 max-w-lg whitespace-pre-line">
          {settings.hero_subtitle}
        </p>

        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button
            className="bg-black text-white px-6 py-3 rounded-md shadow-md hover:opacity-90 hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={() => navigate("/all-items")}
          >
            {settings.hero_cta_text}
          </button>

          <button
            className="border border-black px-6 py-3 rounded-md text-black shadow-sm hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={scrollToFooter}
          >
            {settings.hero_secondary_text}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
