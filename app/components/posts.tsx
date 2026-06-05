import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

type BlogPostsProps = {
  limit?: number
}

export function BlogPosts({ limit }: BlogPostsProps) {
  let allBlogs = getBlogPosts()

  let sortedBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  // 1. Calculate if we actually need the button
  // It only shows if a limit exists AND we have more posts than that limit
  const showViewAll = limit && allBlogs.length > limit

  // 2. Slice the array
  let displayedBlogs = limit ? sortedBlogs.slice(0, limit) : sortedBlogs

  return (
    <div>
      {displayedBlogs.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col gap-figma-inside-gap group"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full grid grid-cols-[8rem_1fr] md:grid-cols-[9rem_1fr] items-baseline gap-2">
            <p className="text-neutral-600 dark:text-neutral-400 tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight underline hover:decoration-neutral-400 underline-offset-4">
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}

      {/* 3. Use the calculated boolean here */}
      {showViewAll && (
        <Link
          href="/blog"
          className="inline-flex items-center underline hover:decoration-neutral-400 underline-offset-4"
        >
          Read all writings
        </Link>
      )}
    </div>
  )
}