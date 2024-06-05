import {format} from 'date-fns';

interface Props {
  date: Date; //userData.createdAt
}
export default function MemberSince({date}: Props) {
  return (
    <span className='font-light text-xs lg:text-sm'>
      Member since <time dateTime={date.toString()}>{format(date.toString(), 'LLLL yyyy')}</time>
    </span>
  );
}
