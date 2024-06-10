import PostDetails from '@/components/ui/post/post-details';

export default function Page({params}: {params: {id: string}}) {
  return (
    <div className='w-full flex flex-col mdplus:flex-row justify-center items-center min-h-screen h-screen'>
      <PostDetails id={params.id} />
    </div>
  );
}
