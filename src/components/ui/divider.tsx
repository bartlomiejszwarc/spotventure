interface Props {
  className?: string;
}
export default function Divider({className}: Props) {
  return <div className={` w-full md:lg-96 h-[1px] bg-zinc-700 `}></div>;
}
