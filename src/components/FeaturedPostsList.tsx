import Link from "next/link";
import Image from "next/image";
import {
  UserIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/16/solid";

interface FeaturedPostsListProps {
  title: string;
  posts: any[];
  className?: string;
  viewAllLink?: string;
  dark?: boolean;
}

export function FeaturedPostsList({
  title,
  posts,
  className = "",
  viewAllLink = "#",
  dark = true,
}: FeaturedPostsListProps) {
  const textColor = dark ? "text-white" : "text-black";
  const subTextColor = dark ? "text-white/60" : "text-gray-500";
  const borderColor = dark ? "border-white/20" : "border-gray-200";
  const itemBorderColor = dark ? "border-white/10" : "border-gray-100";

  return (
    <div className={`flex flex-col ${className}`}>
      <div
        className={`flex items-center justify-between border-b ${borderColor} mb-6 pb-2`}
      >
        <h3
          className={`text-xl font-merriweather font-black uppercase tracking-tight ${textColor}`}
        >
          {title}
        </h3>
        <Link
          href={viewAllLink}
          className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest ${subTextColor} hover:opacity-80 transition-opacity`}
        >
          View All <ChevronDoubleRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {posts.slice(0, 3).map(post => {
          const featuredImage =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          return (
            <article
              key={post.id}
              className={`group flex gap-4 pb-4 border-b ${itemBorderColor} last:border-0`}
            >
              <div
                className={`relative w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-100 border ${borderColor}`}
              >
                {featuredImage ? (
                  <Image
                    src={featuredImage}
                    alt={post.title.rendered}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center italic text-[10px] ${subTextColor} font-raleway`}
                  >
                    NO IMAGE
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center">
                <h4
                  className={`text-[14px] font-merriweather font-bold leading-tight ${textColor} group-hover:opacity-70 transition-opacity mb-2`}
                >
                  <Link href={`/article/${post.slug}`}>
                    {post.title.rendered}
                  </Link>
                </h4>
                <div
                  className={`flex items-center gap-3 text-[10px] ${subTextColor} font-medium font-raleway uppercase tracking-wider`}
                >
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-3 h-3" />
                    <span>{post._embedded?.author?.[0]?.name || "Staff"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChatBubbleLeftIcon className="w-3 h-3" />
                    <span>0</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
