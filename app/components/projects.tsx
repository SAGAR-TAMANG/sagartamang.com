import Link from 'next/link'
import Image from 'next/image'
import { formatDate, getProjects } from 'app/projects/utils'

// 1. Define Props to make the limit optional
type ProjectsProps = {
  limit?: number
}

export function Projects({ limit }: ProjectsProps) {
  let allProjects = getProjects()

  // Sort projects by date
  let sortedProjects = allProjects.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  // 2. Slice the array if a limit is provided
  let displayedProjects = limit ? sortedProjects.slice(0, limit) : sortedProjects

  return (
    <div className="flex flex-col gap-8">
      {displayedProjects.map((project) => {
        const techStack = project.metadata.tech
          ? project.metadata.tech.split(',').map((t) => t.trim())
          : []

        return (
          <Link
            key={project.slug}
            className="group flex flex-col md:flex-row gap-4 items-start"
            href={`/projects/${project.slug}`}
          >
            <div className="w-full md:w-40 shrink-0 relative aspect-video md:aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
              {project.metadata.image && (
                <Image
                  src={project.metadata.image}
                  alt={project.metadata.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              )}
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h2 className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:underline decoration-neutral-400 underline-offset-4">
                  {project.metadata.title}
                </h2>
                <p className="text-neutral-500 tabular-nums shrink-0 ml-4">
                  {formatDate(project.metadata.publishedAt, false)}
                </p>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                {project.metadata.summary}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        )
      })}

      {/* 3. Conditional "View All" Button */}
      {limit && (
        <Link
          href="/projects"
          className="inline-flex items-center font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mt-2"
        >
          View all projects
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