import { AdPlaceholder } from "@/components/AdPlaceholder";
import { getHomepagePosts, getLatestFrontPageMedia } from "@/lib/wordpress";
import { HomeNewsColumns } from "@/components/HomeNewsColumns";
import { MainFeaturedArticle } from "@/components/MainFeaturedArticle";
import { FrontPagePreview } from "@/components/FrontPagePreview";
import { BoldPostsList } from "@/components/BoldPostsList";
import { SquareImagePostsList } from "@/components/SquareImagePostsList";
import { getPostsWithImages, getTrendingPosts } from "@/utils/post-utils";

export default async function HomePage() {
  const [posts, frontPageMedia] = await Promise.all([
    getHomepagePosts(),
    getLatestFrontPageMedia(),
  ]);

  const trendingPosts = getTrendingPosts(posts);

  // Let's assume the first post is the featured one
  const featuredPost = posts[0];

  const squareListPosts = getPostsWithImages(posts, 5, 1);

  return (
    <main className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Mobile: Front page preview at the very top */}
      <div className="lg:hidden mb-8">
        <FrontPagePreview
          image={frontPageMedia.image}
          pdf={frontPageMedia.pdf}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Content Column */}
        <div className="lg:w-2/3 flex flex-col gap-12 stagger-children">
          <MainFeaturedArticle post={featuredPost} />

          {/* Above the fold rule */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-rule" />
            <div className="h-[3px] w-16 bg-accent-gold" />
            <div className="flex-1 h-px bg-rule" />
          </div>

          <BoldPostsList
            title="Trending Posts"
            posts={trendingPosts.length ? trendingPosts : posts}
          />
          <SquareImagePostsList posts={squareListPosts} />
        </div>
        {/* Sidebar Column — desktop only for ads, front page preview */}
        <div className="lg:w-1/3 flex flex-col gap-10 lg:border-l lg:border-rule lg:pl-10 stagger-children">
          {/* Front page preview — desktop only (shown above on mobile) */}
          <div className="hidden lg:block">
            <FrontPagePreview
              image={frontPageMedia.image}
              pdf={frontPageMedia.pdf}
            />
          </div>
          <div className="hidden lg:block">
            <AdPlaceholder variant="sidebar" label="Sidebar ad — 300×250 medium rectangle" />
          </div>
          <HomeNewsColumns posts={posts} />
          <div className="hidden lg:block">
            <AdPlaceholder variant="sidebar" label="Sidebar ad — 300×250 medium rectangle" />
          </div>
        </div>
      </div>
    </main>
  );
}
