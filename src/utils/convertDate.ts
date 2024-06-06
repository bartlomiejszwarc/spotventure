import {format} from 'date-fns';

export default function convertDate(date: Date | undefined, dateFormat: string) {
  if (date) return format(date!?.toString(), dateFormat);
}
