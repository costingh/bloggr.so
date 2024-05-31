import similerItems from "@/lib/utils/similarItems";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
// import SimilarPosts from "@/partials/SimilarPosts";
// import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";

const PostSingle = ({ post, posts, authors, slug }) => {
    const { description, title, date, image, categories, tags, content, mdxContent } = post;
    description = description ? description : content.slice(0, 120);
    const similarPosts = similerItems(post, posts, slug);

    return (
        <>
            <section className="section">
                <div className="mx-auto max-w-3xl px-8">
                    <article className="text-center">
                        {markdownify(title, "h1", "h2")}

                        {image && (
                            <Image
                                src={image}
                                height={400}
                                width={800}
                                alt={title}
                                className="mx-auto mb-10 mt-10 rounded-lg"
                            />
                        )}
                        <ul className="text-text mb-8 mt-4 flex flex-wrap items-center justify-center space-x-3">
                            <li>
                                {authors
                                    .filter((author) =>
                                        authors
                                            .map((author) => slugify(author))
                                            .includes(
                                                slugify(
                                                    author.title,
                                                ),
                                            ),
                                    )
                                    .map((author, i) => (
                                        <Link
                                            href={`/authors/${slugify(
                                                author.title,
                                            )}`}
                                            key={`author-${i}`}
                                            className="flex items-center hover:text-indigo-600"
                                        >
                                            {author.image && (
                                                <Image
                                                    src={
                                                        author.image
                                                    }
                                                    alt={
                                                        author.title
                                                    }
                                                    height={50}
                                                    width={50}
                                                    className="mr-2 h-6 w-6 rounded-full"
                                                />
                                            )}
                                            <span>
                                                {author.title}
                                            </span>
                                        </Link>
                                    ))}
                            </li>
                            <li>{date}</li>
                            <li>
                                <ul>
                                    {categories.map((category, i) => (
                                        <li
                                            className="inline-block"
                                            key={`category-${i}`}
                                        >
                                            <Link
                                                href={`/categories/${slugify(
                                                    category,
                                                )}`}
                                                className="mr-3 hover:text-indigo-600"
                                            >
                                                &#9635; {humanize(category)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                        <div className="content mb-16 text-left">
                            {/* <MDXRemote
                                {...mdxContent}
                                components={shortcodes}
                            /> */}
                        </div>
                        <div className="flex flex-wrap items-center justify-between">
                            <ul className="mb-4 mr-4 space-x-3">
                                {tags.map((tag, i) => (
                                    <li
                                        className="inline-block"
                                        key={`tag-${i}`}
                                    >
                                        <Link
                                            href={`/tags/${slugify(tag)}`}
                                            className="text-dark mb-2 block rounded-lg bg-gray-100 px-2 py-1 text-[10px] font-semibold hover:text-indigo-600"
                                        >
                                            #{humanize(tag)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {/* <Share
                className="social-share mb-4"
                title={title}
                description={description}
                slug={slug}
              /> */}
                        </div>
                    </article>
                </div>
            </section>
            <section className="section">
                <div className="mx-auto max-w-4xl px-8">
                    <h2 className="mb-8 text-center">Similar Posts</h2>
                    {/* <SimilarPosts posts={similarPosts.slice(0, 2)} /> */}
                </div>
            </section>
        </>
    );
};

export default PostSingle;
