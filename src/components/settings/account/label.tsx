interface Props {
  text: string;
  disabled: boolean;
}
export default function Label({text, disabled}: Props) {
  return (
    <span
      className={`uppercase ${disabled ? 'text-zinc-500 dark:text-zinc-500' : ''} text-zinc-600 font-semibold dark:text-zinc-400 text-[15px] tracking-wide`}>
      {text}
    </span>
  );
}
