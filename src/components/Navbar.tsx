import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export function Navbar() {
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
    { name: "CONTACT", href: "#" },
    { name: "FIND THE CHRONICLE", href: "#" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 h-12 flex items-center justify-between font-raleway">
        <div className="flex items-center gap-6 h-full text-[13px] font-extrabold tracking-wider">
          {navItems.map(item => (
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
                {item.hasDropdown && <ChevronDownIcon className="w-3.5 h-3.5" />}
              </Link>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-600 transition-colors">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
