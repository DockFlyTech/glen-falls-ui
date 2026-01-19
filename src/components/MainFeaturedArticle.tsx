import Link from "next/link";
import Image from "next/image";
import { getPrimaryCategory } from "@/lib/normalizePost";
import { Post } from "@/app/types";

export function MainFeaturedArticle({ post }: { post: Post }) {
  if (!post) return null;

  const category = getPrimaryCategory(post);
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      <div className="lg:col-span-4 flex flex-col justify-center">
        {category && (
          <span className="inline-block bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-4 w-fit">
            {category.name}
          </span>
        )}
        <h1 className="text-4xl font-merriweather font-black leading-[1.1] mb-4 tracking-tight">
          <Link
            href={`/article/${post.slug}`}
            className="hover:text-gray-800 transition-colors"
          >
            {post.title.rendered}
          </Link>
        </h1>
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 font-medium font-raleway">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{post._embedded?.author?.[0]?.name || "Dock Fly"}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>0</span>
          </div>
        </div>
        <div
          className="text-[15px] text-gray-700 leading-relaxed font-merriweather columns-1 md:columns-2 gap-6 first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </div>

      <div className="lg:col-span-8 relative min-h-[500px] overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={post.title.rendered}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 italic">
            No featured image
          </div>
        )}
      </div>
    </div>
  );
}
