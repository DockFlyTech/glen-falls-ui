import { getHomepagePosts } from "@/lib/wordpress";
import { FeaturedPostsList } from "./FeaturedPostsList";
import { hasTag } from "@/utils/post-utils";
import { TAGS } from "@/constants/taxonomy";
import Link from "next/link";
import { ScrollToTop } from "./ScrollToTop";
import { socialMediaIcons } from "./icons/social-media-icons";

export async function Footer() {
  const posts = await getHomepagePosts();
  const latest = posts.filter((p: any) => hasTag(p, TAGS.LATEST));
  const trending = posts.filter((p: any) => hasTag(p, TAGS.TRENDING));

  return (
    <footer className="bg-footer-bg text-footer-text pt-16 mt-16">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Column 1: About */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-merriweather font-black mb-4 tracking-tight">
              Glens Falls Chronicle
            </h2>
            <p className="text-dark-text-secondary font-raleway font-bold text-[15px] leading-relaxed mb-8 max-w-sm">
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
                {socialMediaIcons.map(social => (
                  <Link
                    key={social.name}
                    href={social.href}
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

          {/* Column 2: Latest News */}
          <div className="lg:col-span-4">
            <FeaturedPostsList
              title="Latest News"
              posts={latest.length ? latest : posts.slice(0, 3)}
              viewAllLink="/tag/latest"
            />
          </div>

          {/* Column 3: Trending News */}
          <div className="lg:col-span-4">
            <FeaturedPostsList
              title="Trending News"
              posts={trending.length ? trending : posts.slice(3, 6)}
              viewAllLink="/tag/trending"
            />
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black py-4">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center items-center relative">
          <p className="text-[12px] font-raleway font-bold text-dark-text-secondary uppercase tracking-widest text-center">
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
