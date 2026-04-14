import { getPostBySlug } from "@/lib/wordpress";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import {
  getFeaturedImageUrl,
  getAuthorName,
  formatDate,
  getPrimaryCategory,
} from "@/utils/post-utils";
import Image from "next/image";
import Link from "next/link";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <div className="p-6">Article not found</div>;
  }

  const featuredImage = getFeaturedImageUrl(post);
  const category = getPrimaryCategory(post);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Article Content */}
        <article className="lg:w-2/3">
          {/* Category label */}
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="font-section-label hover:text-accent-hover transition-colors inline-block mb-4"
            >
              {category.name}
            </Link>
          )}

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-playfair font-bold leading-[1.1] tracking-tight mb-6">
            {post.title.rendered}
          </h1>

          {/* Gold accent rule */}
          <div className="w-20 h-[3px] bg-accent-gold mb-6" />

          {/* Byline and date */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-rule">
            <span className="font-byline">{getAuthorName(post, "Staff")}</span>
            <span className="text-rule-dark text-xs select-none">&bull;</span>
            <span className="font-date text-text-secondary">{formatDate(post.date)}</span>
          </div>

          {/* Featured image */}
          {featuredImage && (
            <div className="relative w-full aspect-[16/9] mb-8 hover-zoom">
              <Image
                src={featuredImage}
                alt={post.title.rendered}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="my-6">
            <AdPlaceholder variant="in-article" label="In-article ad — top" />
          </div>

          {/* Article body — justified with drop cap */}
          <div
            className="prose max-w-none prose-justified drop-cap prose-headings:font-playfair prose-headings:tracking-tight prose-a:text-accent prose-a:decoration-accent-gold prose-a:underline-offset-2 prose-blockquote:pull-quote"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* End-of-article ornament */}
          <div className="flex items-center justify-center mt-12 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-rule" />
              <span className="text-accent-gold text-sm select-none">&#9670;</span>
              <div className="w-12 h-px bg-rule" />
            </div>
          </div>

          <div className="my-6">
            <AdPlaceholder variant="in-article" label="In-article ad — bottom" />
          </div>
        </article>

        {/* Sidebar — desktop only */}
        <aside className="hidden lg:flex lg:w-1/3 flex-col gap-10 lg:border-l lg:border-rule lg:pl-10">
          <AdPlaceholder variant="sidebar" label="Article sidebar ad — 300×250" />
          <AdPlaceholder variant="sidebar" label="Article sidebar ad — 300×250" />
        </aside>
      </div>
    </div>
  );
}
