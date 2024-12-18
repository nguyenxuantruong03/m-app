import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';
import { currentUser } from '@/lib/auth';

async function Sidebar({ children }: {
  children: React.ReactNode,
}) {
  const user = await currentUser()

  return (
    <div className="h-full">
      <DesktopSidebar language={user?.language || "vi"}/>
      <MobileFooter language={user?.language || "vi"}/>
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}

export default Sidebar;
