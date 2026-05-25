import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog — Tutorials, Builds & Tech by sagar_builds',
  description: 'Read technical tutorials, build logs, and AI engineering insights by Sagar Tamang (@sagar_builds). Topics include AI on Android, MCP servers, Python, Next.js, and more.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold mb-8">My Blog</h1>
      <BlogPosts />
    </section>
  )
}
