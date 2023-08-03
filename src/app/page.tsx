import Aside from '@/components/aside/Aside';
import Main from '../pages/home/page';

export default function Home() {
  return (
    <section className='homePage'>
      <Aside />
      <Main />
    </section>
  )
}
