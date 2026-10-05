"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  direction?: string;
  speed?: string;
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const scrollerRef = useRef<HTMLUListElement>(null);
  // We duplicate items 4 times to ensure we have enough buffer for seamless looping
  const duplicatedItems = [...items, ...items, ...items, ...items];
  const [isMounting, setIsMounting] = useState(true);

  // Initialize scroll position to the start of the second set
  useEffect(() => {
    if (scrollerRef.current) {
      // Calculate the width of one set of items approximately
      // We can just scroll to a safe middle starting point
      const maxScroll = scrollerRef.current.scrollWidth;
      const initialScroll = maxScroll / 4; // Start at the second set
      scrollerRef.current.scrollLeft = initialScroll;
      setIsMounting(false);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === "left"
          ? scrollerRef.current.scrollLeft - scrollAmount
          : scrollerRef.current.scrollLeft + scrollAmount;

      scrollerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    // Logic to seamlessly loop
    if (scrollerRef.current) {
      const scroller = scrollerRef.current;
      const maxScroll = scroller.scrollWidth;
      const setWidth = maxScroll / 4; // Width of one set

      // If we scroll too far right (into the last set), jump back to the second set
      if (scroller.scrollLeft >= setWidth * 3) {
        scroller.scrollLeft = scroller.scrollLeft - setWidth * 2;
      }
      // If we scroll too far left (into the first set), jump forward to the third set
      else if (scroller.scrollLeft <= setWidth * 0.5) {
        scroller.scrollLeft = scroller.scrollLeft + setWidth * 2;
      }
    }
  };

  return (
    <div
      className={cn(
        "group relative z-20 w-full max-w-7xl px-4 md:px-10",
        className,
      )}
    >
      <button
        onClick={() => scroll("left")}
        // Visible on mount to avoid layout shift, but you might want to hide until ready
        className={cn(
          "absolute left-2 top-1/2 -translate-y-1/2 z-50 p-2 bg-slate-900/80 border border-slate-700 text-white rounded-full transition-opacity hover:bg-slate-800 backdrop-blur-sm",
          isMounting ? "opacity-0" : "opacity-100",
        )}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <ul
        ref={scrollerRef}
        // Added onScroll handler for infinite logic
        onScroll={handleScroll}
        className={cn(
          "flex w-full gap-4 py-4 overflow-x-auto",
          "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          // Only show mask if not mounting, otherwise it might look weird during initial jump
          !isMounting &&
            "[mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        )}
      >
        {duplicatedItems.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-slate-800 flex-shrink-0 bg-slate-900 px-8 py-6 md:w-[450px] snap-center select-none"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
            }}
            key={item.title + idx}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="relative z-20 mt-2 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    {item.icon}
                  </div>
                  <span className="text-xl font-bold leading-[1.6] text-white">
                    {item.title}
                  </span>
                  <span className="text-sm leading-[1.6] text-slate-400 font-normal">
                    {item.description}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>

      <button
        onClick={() => scroll("right")}
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 z-50 p-2 bg-slate-900/80 border border-slate-700 text-white rounded-full transition-opacity hover:bg-slate-800 backdrop-blur-sm",
          isMounting ? "opacity-0" : "opacity-100",
        )}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
