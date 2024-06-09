export default function LayoutPostsProfile({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4'>
      {children}
    </div>
  );
}
