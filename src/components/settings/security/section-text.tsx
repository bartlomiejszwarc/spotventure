interface Props {
  text: string;
}
export default function SectionText({text}: Props) {
  return <span className='text-zinc-700 dark:text-zinc-400 text-xl'>{text}</span>;
}
