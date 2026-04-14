"use client";

import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { socialMediaIcons } from "@/components/icons/social-media-icons";
import { Weather } from "@/components/Weather";

const categoryLinks = [
  { name: "Front Page", href: "/category/front-page" },
  { name: "Business", href: "/category/business" },
  { name: "Recreation", href: "/category/recreation" },
  { name: "Technology", href: "/category/technology" },
  { name: "Music", href: "/category/music" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ARTICLES", href: "/category/front-page", hasDropdown: true },
    {
      name: "OBITUARIES",
      href: "https://www.legacy.com/us/obituaries/glensfallschronicle/browse",
      isExternal: true,
    },
    { name: "ABOUT", href: "/about" },
    { name: "ADVERTISE WITH US", href: "#" },
    { name: "CONTACT", href: "/contact" },
    { name: "FIND THE CHRONICLE", href: "/find-us" },
  ];

  return (
    <>
      {/* Masthead — scrolls away naturally */}
      <div className="bg-white">
        {/* Top decorative rule — thin/thick */}
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col items-stretch pt-2">
            <div className="h-px bg-rule-dark" />
            <div className="h-[2px] bg-foreground mt-[2px]" />
          </div>
        </div>

        {/* Mobile: centered logo + subscribe */}
        <div className="lg:hidden flex flex-col items-center py-4 px-4 gap-3">
          <Link href="/">
            <Image
              src="/logos/logo-gem-wide.png"
              alt="The Chronicle"
              width={260}
              height={87}
              className="object-contain"
              priority
            />
          </Link>
          <p className="font-tagline text-text-primary text-center text-sm">
            Northern New York&apos;s Leading Newspaper
          </p>
          <div className="flex items-center gap-2 text-center">
            <p className="font-date text-text-secondary" style={{ fontVariant: "all-small-caps", letterSpacing: "0.08em" }}>
              {today}
            </p>
            <span className="text-rule-dark text-[8px] select-none">&#9670;</span>
            <Weather />
          </div>
        </div>

        {/* Desktop: full masthead with absolute positioning */}
        <div className="hidden lg:block">
          <div className="relative max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-center">
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
                <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="font-search pl-8 pr-3 py-1.5 border border-rule rounded-md w-40 focus:outline-none focus:border-text-tertiary transition-colors bg-white"
                />
              </div>
              <Link
                href="#"
                className="font-button bg-accent text-white px-4 py-1.5 rounded-md hover:bg-accent-hover transition-colors whitespace-nowrap"
              >
                SUBSCRIBE
              </Link>
              <div className="flex items-center gap-3 ml-1 pl-4 border-l border-rule">
                {socialMediaIcons.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="text-text-primary hover:text-accent transition-colors"
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

        {/* Bottom decorative rule — thick/thin */}
        <div className="max-w-[1400px] mx-auto px-4 pb-0">
          <div className="flex flex-col items-stretch">
            <div className="h-[2px] bg-foreground" />
            <div className="h-px bg-rule-dark mt-[2px]" />
          </div>
        </div>
      </div>

      {/* Nav bar — sticks to top on scroll */}
      <nav className="bg-white border-b border-rule sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 h-12 flex items-center justify-between">
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 h-full font-nav">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center h-full group relative"
              >
                <Link
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="hover:text-accent flex items-center gap-1"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDownIcon className="w-3.5 h-3.5" />
                  )}
                </Link>

                {/* Dropdown for Articles */}
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 pt-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="bg-white border border-rule shadow-lg min-w-[200px]">
                      <div className="h-[2px] bg-accent-gold" />
                      {categoryLinks.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="block px-5 py-3 text-[12px] font-libre-franklin font-semibold tracking-wide text-text-primary hover:bg-accent-gold-light hover:text-accent transition-colors border-b border-rule-light last:border-0"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: hamburger + social + subscribe */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-text-primary"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center gap-3">
              {socialMediaIcons.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="text-text-primary hover:text-accent transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
              <Link
                href="#"
                className="font-button bg-accent text-white px-4 py-1.5 rounded-md hover:bg-accent-hover transition-colors text-[11px]"
              >
                SUBSCRIBE
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-rule bg-white">
            <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col gap-1 font-nav">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 border-b border-rule-light hover:text-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-4">
                      {categoryLinks.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2.5 text-[11px] text-text-secondary border-b border-rule-light last:border-0 hover:text-accent transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
