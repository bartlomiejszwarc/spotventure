export default function LayoutPosts({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4'>
      {children}
    </div>
  );
}
