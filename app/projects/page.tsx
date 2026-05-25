import { Projects } from 'app/components/projects'

export const metadata = {
  title: 'Projects — Things sagar_builds Has Built',
  description: 'Explore projects built by Sagar Tamang (@sagar_builds) — AI tools, web apps, research prototypes, and open-source contributions.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold mb-8">Projects</h1>
      <Projects />
    </section>
  )
}
