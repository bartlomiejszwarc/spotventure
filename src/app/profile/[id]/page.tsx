import ProfilePage from './profile-page';

export default function Page({params}: {params: {id: string}}) {
  return <ProfilePage id={params.id} />;
}
