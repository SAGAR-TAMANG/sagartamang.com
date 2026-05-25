import { BlogPosts } from "./posts"

const Writings = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic">
          Writings
        </h2>
        <BlogPosts limit={3} />
      </div>
    </section>

  )
}

export default Writings
