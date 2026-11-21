import React, { useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import { asset } from "../lib/defaults";
import { resolveImage } from "../lib/images";
import { ArrowRight, Sparkles } from "lucide-react";

interface HomeProps {
  scrollToFooter: () => void;
}

// Module-level (survives unmount/remount within this document session, but
// resets on a full page load) so we can tell a Back-button return from the
// very first load of the site.
let renderedInSession = false;

const Home: React.FC<HomeProps> = ({ scrollToFooter }) => {
  const navigate = useNavigate();
  const navType = useNavigationType();
  const { data } = useContent();
  const { settings } = data;

  const background = resolveImage(settings.hero_image_url, asset("syl1.jpg"));

  useEffect(() => {
    const isReturnVisit = navType === "POP" && renderedInSession;
    renderedInSession = true;

    // Remember where the visitor was so returning via the Back button puts
    // them back on the Featured section they left from.
    const saveScroll = () => {
      sessionStorage.setItem("syl:home-scroll", String(window.scrollY));
    };
    window.addEventListener("scroll", saveScroll, { passive: true });

    if (isReturnVisit) {
      const saved = Number(sessionStorage.getItem("syl:home-scroll"));
      if (saved > 0) {
        window.scrollTo(0, saved);
        // Re-apply once layout/images have settled.
        const timer = setTimeout(() => window.scrollTo(0, saved), 150);
        return () => {
          clearTimeout(timer);
          window.removeEventListener("scroll", saveScroll);
        };
      }
    }

    return () => window.removeEventListener("scroll", saveScroll);
  }, [navType]);

  return (
    <section
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-amber-900/30" />

      {/* Soft animated glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-amber-400/25 blur-3xl animate-pulse"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-rose-500/20 blur-3xl animate-pulse"
        style={{ animationDelay: "1.2s" }}
      />

      {/* Decorative floating rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-12 hidden lg:block h-32 w-32 rounded-full border border-white/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-12 hidden lg:block h-32 w-32 rounded-full border border-amber-300/30 translate-x-6 translate-y-6"
      />

      {/* Store Name */}
      <h2
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[92%] text-center
             text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl
             font-extrabold tracking-[0.12em] sm:tracking-[0.25em]
             drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]
             font-serif break-words"
      >
        <span className="gold-glow gold-glow-bright">
          {settings.store_name}
        </span>
      </h2>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 backdrop-blur-md text-amber-200 text-xs md:text-sm font-medium tracking-widest uppercase">
            <Sparkles size={14} />
            Handcrafted fine jewelry
          </div>

          <h1 className="hero-title-lux mt-5 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight whitespace-pre-line">
            {settings.hero_title}
          </h1>

          <p className="mt-5 md:mt-6 text-base md:text-lg max-w-xl whitespace-pre-line leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] bg-gradient-to-r from-amber-200 via-rose-200 to-emerald-200 bg-clip-text text-transparent">
            {settings.hero_subtitle}
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">
            <button
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-black px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-amber-500/30 hover:from-amber-300 hover:to-amber-500 hover:scale-105 hover:shadow-xl transition-all duration-300"
              onClick={() => navigate("/all-items")}
            >
              {settings.hero_cta_text}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <button
              className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/10 backdrop-blur-md px-7 py-3.5 rounded-full text-white font-medium hover:bg-white/20 hover:border-white/60 hover:scale-105 transition-all duration-300"
              onClick={scrollToFooter}
            >
              {settings.hero_secondary_text}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/70 text-xs tracking-widest uppercase">
        <span>Scroll</span>
        <span className="h-6 w-px bg-gradient-to-b from-white/70 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Home;
