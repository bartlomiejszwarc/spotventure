export default function LogoContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex space-x-2 justify-center lg:justify-start w-full'>
      <span className='text-zinc-50 tracking-wider font-merienda'>{children}</span>
    </div>
  );
}
