"use client";
  
import Link from "next/link";
import {
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface ContentNotFoundProps {
  title?: string;
  message?: string;
}

export function ContentNotFound({
  title = "Content Not Found",
  message = "We're sorry, the page you are looking for doesn't exist, has been removed, or is temporarily unavailable.",
}: ContentNotFoundProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="mb-8 flex justify-center">
        <div className="w-24 h-24 bg-paper-aged rounded-full flex items-center justify-center border border-rule-light">
          <MagnifyingGlassIcon className="w-12 h-12 text-rule" />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 tracking-tight uppercase">
        404: {title}
      </h1>

      <div className="w-20 h-1.5 bg-accent-gold mx-auto mb-8"></div>

      <p className="text-lg text-text-secondary font-lora leading-relaxed mb-12 max-w-lg mx-auto">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 bg-accent text-white px-8 py-4 font-black uppercase tracking-widest text-[13px] hover:bg-accent-hover transition-colors w-full sm:w-auto justify-center"
        >
          <HomeIcon className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
