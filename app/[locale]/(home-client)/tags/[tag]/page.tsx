import { getPostsMeta } from "@/lib/posts"
import ListItem from "@/components/(client)/news/ListItem"
import Link from "next/link"
import { currentUser } from "@/lib/auth"
import { getTranslations } from "next-intl/server"
import { createTranslator } from "next-intl"

export const revalidate = 86400

type Props = {
    params: {
        tag: string
    }
}

/**
 * This function generates an array of unique tags from a list of posts metadata.
 * @returns The function `generateStaticParams` returns an array of objects, where each object has a
 * `tag` property. The `tag` property is a unique tag extracted from the `tags` property of each post
 * in the `posts` array. If there are no posts, an empty array is returned.
 */
//Chuyen thanh SSG
export async function generateStaticParams() {
    const posts = await getPostsMeta() //deduped!

    if (!posts) return []

    const tags = new Set(posts.map(post => post.tags).flat())

    return Array.from(tags).map((tag) => ({ tag }))
}

export async function generateMetadata({ params: { tag } }: Props) {
    const user = await currentUser();
    const languageToUse = user?.language || "vi";
    const t = await getTranslations({languageToUse, namespace: "post"})

    return {
        title: `${t("postsAbout")} ${tag}`
    }
}



export default async function TagPostList({ params: { tag } }: Props) {
    const posts = await getPostsMeta() //deduped!
    const user = await currentUser();
    const languageToUse = user?.language || "vi";
    let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

    if (!posts) return <p className="mt-10 text-center">{t("noPostsAvailable")}</p>

    const tagPosts = posts.filter(post => post.tags.includes(tag))

    if (!tagPosts.length) {
        return (
            <div className="text-center">
                <p className="mt-10">{t("noPostKeyword")}</p>
                <Link href="/">{t("backToHome")}</Link>
            </div>
        )
    }
    return(
        <>
            <h2 className="text-3xl mt-4 mb-0">{t("resultFor")}: #{tag}</h2>
            <section className="mt-6 mx-auto max-w-2xl">
                <ul className="w-full list-none p-0">
                    {tagPosts.map(post => (
                        <ListItem key={post.id} post={post} />
                    ))}
                </ul>
            </section>
        </>
    )
}