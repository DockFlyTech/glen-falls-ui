import { getHomepagePosts } from "@/lib/wordpress";
import { FeaturedPostsList } from "./FeaturedPostsList";
import { hasTag } from "@/lib/normalizePost";
import { TAGS } from "@/constants/taxonomy";
import Link from "next/link";
import { ScrollToTop } from "./ScrollToTop";

export async function Footer() {
  const posts = await getHomepagePosts();
  const latest = posts.filter((p: any) => hasTag(p, TAGS.LATEST));
  const trending = posts.filter((p: any) => hasTag(p, TAGS.TRENDING));

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      ),
    },
    {
      name: "Instagram",
      icon: (
        <>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </>
      ),
    },
    {
      name: "X",
      icon: (
        <path d="M4 4l11.733 16h4.267l-11.733-16z M4 20l6.768-6.768 M13.232 10.768L20 4" />
      ),
    },
    {
      name: "LinkedIn",
      icon: (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </>
      ),
    },
  ];

  return (
    <footer className="bg-footer-bg text-footer-text pt-16 mt-16">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Column 1: About */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-merriweather font-black mb-4 tracking-tight">
              Glens Falls Chronicle
            </h2>
            <p className="text-white/60 font-raleway text-[15px] leading-relaxed mb-8 max-w-sm">
              Locally owned and locally committed. Bringing you the latest news,
              events, and stories from the Glens Falls region and beyond.
            </p>

            <div className="flex flex-col gap-4">
              <div className="border-b border-white/20 pb-2 mb-2">
                <h4 className="text-sm font-bold uppercase tracking-widest">
                  Follow Us On:
                </h4>
              </div>
              <div className="flex gap-3">
                {socialLinks.map(social => (
                  <Link
                    key={social.name}
                    href="#"
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors bg-white/5"
                  >
                    <svg
                      className="w-5 h-5 fill-none stroke-current"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {social.icon}
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Featured Posts #1 */}
          <div className="lg:col-span-4">
            <FeaturedPostsList
              title="Featured Posts #1"
              posts={latest.length ? latest : posts.slice(0, 3)}
              viewAllLink="/category/latest"
            />
          </div>

          {/* Column 3: Featured Posts #2 */}
          <div className="lg:col-span-4">
            <FeaturedPostsList
              title="Featured Posts #2"
              posts={trending.length ? trending : posts.slice(3, 6)}
              viewAllLink="/category/trending"
            />
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black py-4">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center items-center relative">
          <p className="text-[12px] font-raleway font-medium text-white/60 uppercase tracking-widest">
            Copyright © 2026 Glen Falls Chronicle
          </p>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <ScrollToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
