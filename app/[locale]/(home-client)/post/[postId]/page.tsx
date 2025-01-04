import getFormattedDate from "@/lib/getFormattedDate";
import { getPostByName, getPostsMeta } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import { currentUser } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { createTranslator } from "next-intl";

export const revalidate = 86400;

type Props = {
  params: {
    postId: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPostsMeta(); //deduped!

  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export async function generateMetadata({ params: { postId } }: Props) {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "post"})
  const post = await getPostByName(`${postId}.mdx`); //deduped!
  //deduped loại bỏ trùng lặp trong quá trình xây dựng
  if (!post) {
    return {
      title: t("postNotFound"),
    };
  }
  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`); //deduped!
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  if (!post) notFound();

  const { meta, content } = post;

  const pubDate = getFormattedDate(meta.date);

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <>
      <div className="mt-28 mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-200">
          {meta.title}
        </h2>
        <p className="mt-0 text-sm mb-5 text-gray-400">{pubDate}</p>
        <article className="text-2xl text-slate-900 dark:text-slate-200">
          {content}
        </article>
        <section>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-slate-200 underline">
            {t("related")}:
          </h3>
          <div className="flex flex-row gap-4 text-lg font-semibold mt-2 text-slate-900 dark:text-slate-200">
            {tags}
          </div>
        </section>
        <Link className="text-lg " href="/home">
          <div className="my-5 flex bg-slate-900 dark:bg-slate-300 text-slate-200 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 w-40 rounded-md h-10 items-center">
            <span className="mx-auto">{t("backToHome")} </span>
          </div>
        </Link>
      </div>
    </>
  );
}
