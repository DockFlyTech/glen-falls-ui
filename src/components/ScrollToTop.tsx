"use client";

import { ChevronUpIcon } from "@heroicons/react/16/solid";

export function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors bg-black"
      aria-label="Scroll to top"
    >
      <ChevronUpIcon className="w-5 h-5 text-white" />
    </button>
  );
}
