interface IButtonProps {
  type?: string;
  text: string;
}
export default function ButtonConfirm({text, type}: IButtonProps) {
  return (
    <button className='w-full bg-zinc-800 py-3 rounded-md flex justify-center shadow-lg'>
      <span className='text-sm tracking-wider font-bold text-zinc-200'>{text}</span>
    </button>
  );
}
