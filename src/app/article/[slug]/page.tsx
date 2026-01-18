import { getPostBySlug } from "@/lib/wordpress";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>; // notice Promise<>
}) {
  const { slug } = await params;  // <-- unwrap here
  const post = await getPostBySlug(slug);

  if (!post) {
    return <div className="p-6">Article not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">{post.title.rendered}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
