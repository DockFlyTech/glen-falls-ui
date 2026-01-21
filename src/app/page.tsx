import { getHomepagePosts, getLatestFrontPageMedia } from "@/lib/wordpress";
import { HomeNewsColumns } from "@/components/HomeNewsColumns";
import { MainFeaturedArticle } from "@/components/MainFeaturedArticle";
import { FrontPagePreview } from "@/components/FrontPagePreview";
import { BoldPostsList } from "@/components/BoldPostsList";
import { SquareImagePostsList } from "@/components/SquareImagePostsList";
import {
  getPostsWithImages,
  getTrendingPosts,
} from "@/utils/post-utils";

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
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Content Column */}
        <div className="lg:w-2/3 flex flex-col gap-12">
          <MainFeaturedArticle post={featuredPost} />
          <BoldPostsList
            title="Trending Posts #1"
            posts={trendingPosts.length ? trendingPosts : posts}
          />
          <SquareImagePostsList posts={squareListPosts} />
        </div>
        {/* Sidebar Column */}
        <div className="lg:w-1/3 flex flex-col gap-10">
          <FrontPagePreview image={frontPageMedia.image} pdf={frontPageMedia.pdf} />
          <HomeNewsColumns posts={posts} />
        </div>
      </div>
    </main>
  );
}
