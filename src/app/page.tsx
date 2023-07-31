import Aside from '@/components/aside/Aside';
import AppProvider from '../context/AppProvider';
import Main from '../pages/home/page';

export default function Home() {
  return (
    <AppProvider>
      <Aside />
      <Main />
    </AppProvider>
  )
}
