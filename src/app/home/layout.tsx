import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex h-screen md:flex-row'>
      <div className='absolute z-30'>
        <SideNav />
      </div>
      <div className='flex-grow pt-16 pl-20 md:p-16 bg-slate-200'>{children}</div>
    </div>
  );
}
