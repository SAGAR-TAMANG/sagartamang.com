import { BlogPosts } from 'app/components/posts'
import MainHeader from './components/header'
import Current from './components/current'
import Previous from './components/previous'

export default function Page() {
  return (
    <div className='flex flex-col gap-figma-outside-gap'>
      <MainHeader />
      <Current />
      <Previous />
      <BlogPosts />
    </div>
  )
}
