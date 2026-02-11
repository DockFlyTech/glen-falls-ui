"use client";

import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { socialMediaIcons } from "@/components/icons/social-media-icons";
import { Weather } from "@/components/Weather";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ARTICLES", href: "#", hasDropdown: true },
    {
      name: "OBITUARIES",
      href: "https://www.legacy.com/us/obituaries/glensfallschronicle/browse",
      isExternal: true,
    },
    {
      name: "ABOUT",
      href: "/about",
    },
    { name: "ADVERTISE WITH US", href: "#" },
    { name: "CONTACT", href: "/contact" },
    { name: "FIND THE CHRONICLE", href: "/find-us" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      {/* Masthead section — visible at top, collapses on scroll */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
        }`}
      >
        <div className="relative max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-center">
          {/* Logo — always centered */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logos/logo-gem-wide.png"
              alt="The Chronicle"
              width={300}
              height={100}
              className="object-contain min-w-[300px]"
              priority
            />
          </Link>

          {/* Left side — tagline, date, weather */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            <p className="font-tagline text-gray-900 whitespace-nowrap">
              Northern New York&apos;s Leading Newspaper
            </p>
            <div className="flex items-center gap-3">
              <p className="font-date">{today}</p>
              <Weather />
            </div>
          </div>

          {/* Right side — search, subscribe, social icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="font-search pl-8 pr-3 py-1.5 border border-gray-300 rounded-md w-40 focus:outline-none focus:border-gray-500 transition-colors"
              />
            </div>
            <Link
              href="#"
              className="font-button bg-gray-900 text-white px-4 py-1.5 rounded-md hover:bg-black transition-colors whitespace-nowrap"
            >
              SUBSCRIBE
            </Link>
            <div className="flex items-center gap-3 ml-1 pl-4 border-l border-gray-300">
              {socialMediaIcons.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="text-gray-900 hover:text-black transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nav links — always visible */}
      <div className="max-w-[1400px] mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-6 h-full font-nav">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center h-full group relative"
            >
              <Link
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="hover:text-gray-600 flex items-center gap-1"
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDownIcon className="w-3.5 h-3.5" />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
