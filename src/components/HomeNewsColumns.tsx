"use client";

import { useState } from "react";
import { hasTag } from "@/lib/normalizePost";
import { TAGS } from "@/constants/taxonomy";
import { ClockIcon } from "@heroicons/react/20/solid";
import { FireIcon } from "@heroicons/react/20/solid";
import { Post } from "@/app/types";

export function HomeNewsColumns({ posts }: { posts: Post[] }) {
  const [activeTab, setActiveTab] = useState<"latest" | "trending">("latest");

  const latest = posts.filter((p: Post) => hasTag(p, TAGS.LATEST));
  const trending = posts.filter((p: Post) => hasTag(p, TAGS.TRENDING));

  const displayPosts = activeTab === "latest" ? latest : trending;

  return (
    <div className="border border-gray-200">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("latest")}
          className={`flex-1 py-4 flex flex-col items-center justify-center transition-colors relative ${
            activeTab === "latest"
              ? "text-black"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {activeTab === "latest" && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-black" />
          )}
          <ClockIcon className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-bold uppercase tracking-wider font-raleway">
            Latest News
          </span>
        </button>
        <button
          onClick={() => setActiveTab("trending")}
          className={`flex-1 py-4 flex flex-col items-center justify-center transition-colors relative ${
            activeTab === "trending"
              ? "text-black"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {activeTab === "trending" && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-black" />
          )}
          <FireIcon className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-bold uppercase tracking-wider font-raleway">
            Trending News
          </span>
        </button>
      </div>

      <div className="p-0">
        {displayPosts.slice(0, 5).map((post, index) => (
          <div
            key={post.id}
            className={
              index !== displayPosts.slice(0, 5).length - 1
                ? "border-b border-gray-100"
                : ""
            }
          >
            <ArticlePreviewSmall post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticlePreviewSmall({ post }: { post: any }) {
  const category = post._embedded?.["wp:term"]?.[0]?.[0];

  return (
    <article className="p-6">
      {category && (
        <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-black font-raleway">
          {category.name}
        </p>
      )}

      <h3 className="text-[16px] font-merriweather font-bold leading-[1.3] mb-2">
        <a href={`/article/${post.slug}`} className="hover:text-gray-700">
          {post.title.rendered}
        </a>
      </h3>

      <div className="text-[11px] text-gray-500 flex flex-wrap gap-x-4 gap-y-1 font-medium font-raleway">
        <div className="flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5"
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
            className="w-3.5 h-3.5"
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
            className="w-3.5 h-3.5"
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
    </article>
  );
}
