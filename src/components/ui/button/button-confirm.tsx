interface IButtonProps {
  type?: string;
  disabled?: boolean;
  text: string;
}
export default function ButtonConfirm({text, type, disabled}: IButtonProps) {
  return (
    <button
      className={`w-full ${disabled ? 'bg-zinc-700/70' : 'bg-zinc-800'} py-3 rounded-md flex justify-center shadow-lg`}
      disabled={disabled}>
      <span className={`text-sm tracking-wider font-bold ${!disabled ? 'text-zinc-200' : 'text-zinc-400'}`}>
        {text}
      </span>
    </button>
  );
}
