import { getPostBySlug } from "@/lib/wordpress";
import { AdPlaceholder } from "@/components/AdPlaceholder";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>; // notice Promise<>
}) {
  const { slug } = await params; // <-- unwrap here
  const post = await getPostBySlug(slug);

  if (!post) {
    return <div className="p-6">Article not found</div>;
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Article Content */}
        <article className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-6">{post.title.rendered}</h1>
          <div className="my-6">
            <AdPlaceholder variant="in-article" label="In-article ad — top" />
          </div>
          <div
            className="prose max-w-none prose-justified"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
          <div className="my-6">
            <AdPlaceholder variant="in-article" label="In-article ad — bottom" />
          </div>
        </article>

        {/* Sidebar Ads */}
        <aside className="lg:w-1/3 flex flex-col gap-10 lg:border-l lg:border-rule lg:pl-10">
          <AdPlaceholder variant="sidebar" label="Article sidebar ad — 300×250" />
          <AdPlaceholder variant="sidebar" label="Article sidebar ad — 300×250" />
        </aside>
      </div>
    </div>
  );
}
