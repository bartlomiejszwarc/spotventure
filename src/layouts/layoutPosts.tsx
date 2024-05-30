export default function LayoutPosts({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full flex pb-12 '>
      <div className='flex flex-wrap gap-y-6 gap-x-10'>{children}</div>
    </div>
  );
}
