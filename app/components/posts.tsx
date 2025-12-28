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
          <div className="w-full flex flex-row md:flex-row items-center space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 mr-4 md:mr-10 tabular-nums shrink-0">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:underline decoration-neutral-400 underline-offset-4">
              {post.metadata.title}asdfjdsjflkdsjlksjflkssd
            </p>
          </div>
        </Link>
      ))}

      {/* 3. Use the calculated boolean here */}
      {showViewAll && (
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          Read all writings
          <svg
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}