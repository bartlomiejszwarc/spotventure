export default function LayoutPosts({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='w-full flex flex-wrap gap-4 justify-center md:justify-start'>{children}</div>;
}
