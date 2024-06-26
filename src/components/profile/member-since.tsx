import convertDate from '@/utils/convert-date';
interface Props {
  date: Date;
}
export default function MemberSince({date}: Props) {
  return (
    <span className='font-light text-xs lg:text-sm text-zinc-800 dark:text-zinc-300'>
      Member since {convertDate(date, 'LLLL yyyy')}
    </span>
  );
}
