import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { Post } from "@/app/types";

interface BoldPostsListProps {
  title: string;
  posts: Post[];
  className?: string;
  viewAllLink?: string;
}

export function BoldPostsList({
  title,
  posts,
  className = "",
  viewAllLink = "#",
}: BoldPostsListProps) {
  return (
    <div className={`border-[3px] border-accent p-1 ${className}`}>
      <div className="border border-accent p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-merriweather font-black tracking-tight">
            {title}
          </h3>
          <Link
            href={viewAllLink}
            className="flex items-center gap-1 text-[13px] font-bold text-accent hover:text-accent-hover transition-colors"
          >
            View All <ChevronDoubleRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="w-16 h-1.5 bg-accent-gold mb-8"></div>

        <div className="flex flex-col">
          {posts.slice(0, 5).map((post, index) => (
            <div key={post.id}>
              {index > 0 && (
                <div className="ornament-divider">
                  <span className="text-rule-dark text-xs select-none">&#9670;</span>
                </div>
              )}
              <Link
                href={`/article/${post.slug}`}
                className="flex gap-6 py-4 group"
              >
                <span className="text-4xl font-merriweather font-black text-accent leading-none pt-1">
                  {index + 1}
                </span>
                <h4 className="text-[20px] font-merriweather font-black leading-tight text-black group-hover:text-gray-700 transition-colors">
                  {post.title.rendered}
                </h4>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
