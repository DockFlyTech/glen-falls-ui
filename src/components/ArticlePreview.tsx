import Link from "next/link";
import { getPrimaryCategory } from "@/utils/post-utils";
import { Post } from "@/app/types";
import { getAuthorName, formatDate } from "@/utils/post-utils";

export function ArticlePreview({ post }: { post: Post }) {
  const category = getPrimaryCategory(post);

  return (
    <article className="border-b border-gray-200 py-6">
      {category && (
        <Link 
          href={`/category/${category.slug}`}
          className="text-xs font-bold uppercase tracking-wide mb-2 block hover:text-gray-600 transition-colors text-black"
        >
          {category.name}
        </Link>
      )}

      <h2 className="text-xl font-serif font-semibold leading-tight">
        <Link href={`/article/${post.slug}`}>{post.title.rendered}</Link>
      </h2>

      <div className="text-sm text-gray-500 mt-2 flex gap-4">
        <span>{getAuthorName(post)}</span>
        <span>{formatDate(post.date)}</span>
      </div>
    </article>
  );
}
