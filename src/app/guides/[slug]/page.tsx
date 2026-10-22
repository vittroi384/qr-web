import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePostPage } from "@/components/pages/GuidePostPage";
import { getGuide } from "@/lib/content/guides";
import { alternatesEnOnly } from "@/lib/i18n";

type Props = { params: Promise<{ slug: string }> };

// One article per slug (/guides/qr-code-size-for-printing). English only; unknown slugs 404.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getGuide((await params).slug);
  if (!post) return {};
  const path = `/guides/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: alternatesEnOnly(path),
    openGraph: { title: post.title, description: post.description, url: path, type: "article", publishedTime: post.published, locale: "en_US" },
  };
}

export default async function Page({ params }: Props) {
  const post = getGuide((await params).slug);
  if (!post) notFound();
  return <GuidePostPage post={post} />;
}
