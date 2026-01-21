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
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
          <MagnifyingGlassIcon className="w-12 h-12 text-gray-300" />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-merriweather font-black mb-6 tracking-tight text-gray-900 uppercase">
        404: {title}
      </h1>

      <div className="w-20 h-1.5 bg-black mx-auto mb-8"></div>

      <p className="text-lg text-gray-600 font-merriweather leading-relaxed mb-12 max-w-lg mx-auto">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-[13px] hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
        >
          <HomeIcon className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
