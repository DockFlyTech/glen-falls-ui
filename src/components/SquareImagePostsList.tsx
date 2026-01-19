import Link from "next/link";
import Image from "next/image";
import {
  UserIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/16/solid";
import { Post } from "@/app/types";
import { getFeaturedImageUrl, getAuthorName, formatDate } from "@/utils/post-utils";
import { PhotoIcon } from "@heroicons/react/20/solid";


interface SquareImagePostsListProps {
  posts: Post[];
  className?: string;
}

export function SquareImagePostsList({
  posts,
  className = "",
}: SquareImagePostsListProps) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {posts.map(post => {
        const featuredImage = getFeaturedImageUrl(post);

        return (
          <article
            key={post.id}
            className="flex flex-col md:flex-row gap-6 pb-6 border-b border-gray-100 last:border-0"
          >
            <div className="relative w-full md:w-[220px] aspect-square overflow-hidden bg-gray-100 shrink-0">
              {featuredImage ? (
                <Image
                  src={featuredImage}
                  alt={post.title.rendered}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center italic text-gray-400 font-raleway">
                  <PhotoIcon className="w-10 h-10" />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center grow">
              <h3 className="text-2xl font-merriweather font-black leading-tight mb-3">
                <Link
                  href={`/article/${post.slug}`}
                  className="hover:text-gray-800 transition-colors"
                >
                  {post.title.rendered}
                </Link>
              </h3>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium font-raleway uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>{getAuthorName(post)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ChatBubbleLeftIcon className="w-3.5 h-3.5" />
                  <span>0</span>
                </div>
              </div>

              <div
                className="text-gray-600 font-merriweather text-[15px] leading-relaxed line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
