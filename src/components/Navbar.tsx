"use client";

import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { socialMediaIcons } from "@/components/icons/social-media-icons";
import { Weather } from "@/components/Weather";

export function Navbar() {
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
    <>
      {/* Masthead — scrolls away naturally */}
      <div className="bg-white border-b border-rule">
        {/* Top decorative rule — thin/thick/thin */}
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col items-stretch pt-2">
            <div className="h-px bg-rule-dark" />
            <div className="h-[2px] bg-foreground mt-[2px]" />
          </div>
        </div>

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

          {/* Left side — tagline, dateline, weather */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
            <p className="font-tagline text-text-primary whitespace-nowrap">
              Northern New York&apos;s Leading Newspaper
            </p>
            <div className="flex items-center gap-2">
              <p className="font-date text-text-secondary" style={{ fontVariant: "all-small-caps", letterSpacing: "0.08em" }}>
                {today} &bull; Glens Falls, New York
              </p>
              <span className="text-rule-dark text-[8px] select-none">&#9670;</span>
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

        {/* Bottom decorative rule — thick/thin */}
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col items-stretch pb-0">
            <div className="h-[2px] bg-foreground" />
            <div className="h-px bg-rule-dark mt-[2px]" />
          </div>
        </div>
      </div>

      {/* Nav bar — sticks to top on scroll */}
      <nav className="bg-white border-b border-rule sticky top-0 z-50">
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
    </>
  );
}
