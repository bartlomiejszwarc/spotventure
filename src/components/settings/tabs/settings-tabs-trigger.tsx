interface Props {
  value: string;
  name: string;
  onTabChange: any;
  activeTab: string;
}
export default function SettingsTabsTrigger({value, name, activeTab, onTabChange}: Props) {
  const onSetActiveTab = (value: string) => {
    onTabChange(value);
  };
  return (
    <div
      className={`${activeTab === value ? 'font-semibold text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400' : 'bg-transparent text-zinc-700 dark:text-zinc-300'} px-2 flex justify-center tracking-wide font-semibold cursor-pointer`}
      onClick={() => onSetActiveTab(value)}>
      <span>{name}</span>
    </div>
  );
}
