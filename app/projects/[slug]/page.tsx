import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { getProjects } from '../utils'
import Image from 'next/image' // Import Next.js Image
import BoxedText from 'app/components/boxed-text'

export async function generateStaticParams() {
  let posts = getProjects()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // Next.js 15 fix
  let post = getProjects().find((post) => post.slug === slug)
  if (!post) return

  let { title, publishedAt, summary, image } = post.metadata
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: 'article',
      publishedTime: publishedAt,
      url: `${baseUrl}/projects/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
      images: [ogImage],
    },
  }
}

export default async function Project({ params }) {
  const { slug } = await params; // Next.js 15 fix
  let post = getProjects().find((post) => post.slug === slug)

  if (!post) notFound()

  // Split the tech string into an array: "Next.js, React" -> ["Next.js", "React"]
  const techStack = post.metadata.tech 
    ? post.metadata.tech.split(',').map((t) => t.trim()) 
    : []

  return (
    <section className='flex flex-col gap-figma-inside-gap'>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork', // Changed to valid Schema type
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
          }),
        }}
      />
      
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>

      {/* RENDER IMAGE IF EXISTS */}
      {post.metadata.image && (
        <div>
           <Image 
             src={post.metadata.image} 
             alt={post.metadata.title} 
             width={800} 
             height={400} 
             className="rounded-lg border border-neutral-200 dark:border-neutral-800"
           />
        </div>
      )}

      {/* RENDER TECH STACK TAGS */}
      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {techStack.map((tech) => (
            <BoxedText key={tech} text={tech} />
          ))}
        </div>
      )}

      <article className="prose prose-headings:font-semibold prose-a:text-blue-600">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}