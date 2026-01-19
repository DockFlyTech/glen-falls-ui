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
    <div className={`border-[3px] border-black p-1 ${className}`}>
      <div className="border border-black p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-merriweather font-black tracking-tight text-black">
            {title}
          </h3>
          <Link
            href={viewAllLink}
            className="flex items-center gap-1 text-[13px] font-bold text-black hover:opacity-70 transition-opacity"
          >
            View All <ChevronDoubleRightIcon className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="w-16 h-1.5 bg-black mb-8"></div>

        <div className="flex flex-col">
          {posts.slice(0, 5).map((post, index) => (
            <Link 
              key={post.id} 
              href={`/article/${post.slug}`}
              className="flex gap-6 py-6 border-b border-gray-200 last:border-0 group"
            >
              <span className="text-4xl font-merriweather font-black text-black leading-none pt-1">
                {index + 1}
              </span>
              <h4 className="text-[20px] font-merriweather font-black leading-tight text-black group-hover:text-gray-700 transition-colors">
                {post.title.rendered}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
