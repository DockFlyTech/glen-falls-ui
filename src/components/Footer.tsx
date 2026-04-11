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
      {/* Gold accent bar at top of footer */}
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="h-[3px] bg-accent-gold mb-12" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 mb-16">
          {/* Column 1: About */}
          <div className="lg:col-span-4 lg:pr-10">
            <h2 className="text-2xl font-playfair font-bold mb-2 tracking-tight">
              Glens Falls Chronicle
            </h2>
            <p className="font-playfair italic text-sm text-white/50 mb-6">
              Northern New York&apos;s Leading Newspaper
            </p>
            <p className="text-white/60 font-libre-franklin text-[14px] leading-relaxed mb-8 max-w-sm">
              Locally owned and locally committed. Bringing you the latest news,
              events, and stories from the Glens Falls region and beyond.
            </p>

            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent-gold font-libre-franklin">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialMediaIcons.map(social => (
                  <Link
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="w-9 h-9 border border-white/15 flex items-center justify-center hover:bg-accent-gold hover:border-accent-gold transition-colors"
                  >
                    <svg
                      className="w-4 h-4 fill-none stroke-current"
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
          <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:px-10 mt-10 lg:mt-0">
            <FeaturedPostsList
              title="Latest News"
              posts={latest.length ? latest : posts.slice(0, 3)}
              viewAllLink="/tag/latest"
            />
          </div>

          {/* Column 3: Trending News */}
          <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-10 mt-10 lg:mt-0">
            <FeaturedPostsList
              title="Trending News"
              posts={trending.length ? trending : posts.slice(3, 6)}
              viewAllLink="/tag/trending"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-between items-center">
          <p className="text-[11px] font-libre-franklin font-medium text-white/40 uppercase tracking-[0.12em]">
            &copy; {new Date().getFullYear()} Glens Falls Chronicle &bull; 15 Ridge Street, Glens Falls, NY 12801
          </p>
          <ScrollToTop />
        </div>
      </div>
    </footer>
  );
}
