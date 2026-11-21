import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import { asset } from "../lib/defaults";
import { resolveImage } from "../lib/images";
import type { FeaturedCollection } from "../lib/types";

const Featured: React.FC = () => {
  const { data } = useContent();
  const { settings, featured } = data;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  // Measure before the first paint so arrows/fades are correct immediately.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateArrows();

    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    // Also react to layout changes (images loading, data refreshing).
    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
      observer.disconnect();
    };
  }, [updateArrows, featured.length]);

  const scrollByCards = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>("[data-featured-card]");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const amount = firstCard
      ? firstCard.offsetWidth + gap
      : el.clientWidth * 0.8;

    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const hasMultiple = featured.length > 1;
  // When every card fits (nothing to scroll), let them fill the row exactly
  // instead of reserving space for the edge fades.
  const isFit = !canScrollLeft && !canScrollRight;
  // Full-width/2-up when everything fits; otherwise ~2.5 cards per view on
  // desktop so the images are wider and the carousel affordance is obvious.
  const cardWidth = isFit
    ? "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]"
    : "w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(40%-1.5rem)]";

  return (
    <section
      className="relative py-16 px-4 md:px-6 overflow-hidden"
      style={{ backgroundColor: "oklch(0.94 0.02 150)" }}
    >
      <h2 className="text-center text-3xl md:text-4xl font-bold">
        <span className="gold-glow">{settings.featured_heading}</span>
      </h2>

      <p className="text-center text-gray-600 mt-2 px-2 md:px-0 whitespace-pre-line">
        {settings.featured_subheading}
      </p>

      {featured.length > 0 ? (
        <div className="relative mt-8 md:mt-10 flex w-full max-w-7xl mx-auto">
          {/* Edge fade hints — sit over the reserved edge zone only, never
              over a fully visible card, and never intercept scrolling. */}
          {/* Edge fade hints */}
          {canScrollLeft && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-4 md:w-6 bg-gradient-to-r from-[oklch(0.94_0.02_150)] to-transparent"
            />
          )}
          {canScrollRight && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-4 md:w-6 bg-gradient-to-l from-[oklch(0.94_0.02_150)] to-transparent"
            />
          )}

          {/* Scroll arrows */}
          {hasMultiple && canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Scroll featured collections left"
              className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-lg hover:bg-gray-100 active:scale-95 transition"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {hasMultiple && canScrollRight && (
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Scroll featured collections right"
              className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-lg hover:bg-gray-100 active:scale-95 transition"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Scrollable track. The horizontal padding reserves an empty zone
              for the fades; scroll-padding keeps snapped cards aligned just
              inside it, so a cut card always peeks under the fade. */}
          <div
            ref={scrollRef}
            className={`no-scrollbar flex w-full snap-x snap-mandatory gap-4 md:gap-6 overflow-x-auto overscroll-x-contain scroll-smooth pl-4 pr-4 md:pl-6 md:pr-6 scroll-pl-4 md:scroll-pl-6 ${
              isFit ? "justify-center" : ""
            }`}
            role="region"
            aria-label={`${settings.featured_heading} carousel`}
            tabIndex={0}
          >
            {featured.map((collection) => (
              <div
                key={collection.id}
                data-featured-card
                className={`flex shrink-0 snap-start flex-col overflow-hidden text-center md:text-left ${cardWidth}`}
              >
                {/* Fixed landscape ratio keeps every card's image exactly the
                    same size, regardless of how long its description is. */}
                <img
                  src={resolveImage(
                    collection.image_url,
                    asset(
                      `f${((((collection.sort_order - 1) % 3) + 3) % 3) + 1}.png`,
                    ),
                  )}
                  alt={collection.title}
                  className="w-full aspect-[4/3] object-cover rounded-lg shadow-md"
                />
                <h3 className="text-lg md:text-xl font-semibold mt-3 text-black">
                  {collection.title}
                </h3>
                <p className="text-gray-600 mt-1 line-clamp-2 min-h-12">
                  {collection.description}
                </p>
                {isExternalLink(collection) ? (
                  <a
                    className={exploreClass}
                    href={(collection.link ?? "").trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore Collection →
                  </a>
                ) : (
                  <Link
                    className={exploreClass}
                    to={`/collection/${collection.id}`}
                  >
                    Explore Collection →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No featured collections yet.
        </p>
      )}
    </section>
  );
};

const exploreClass =
  "mt-2 inline-block pb-1 font-medium text-blue-500 hover:text-green-900 hover:translate-x-1 transition-all duration-300";

/**
 * An external URL in the collection's link field opens elsewhere; otherwise
 * the link navigates through React Router (not a raw hash anchor) so the
 * browser history entry is tracked and the Back button can return here.
 */
function isExternalLink(collection: FeaturedCollection) {
  return /^https?:\/\//i.test((collection.link ?? "").trim());
}

export default Featured;
