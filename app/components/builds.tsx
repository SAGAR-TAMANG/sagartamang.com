import { Projects } from "./projects"

const Builds = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic">
          Builds
        </h2>
        <Projects limit={1} />
      </div>
    </section>

  )
}

export default Builds
