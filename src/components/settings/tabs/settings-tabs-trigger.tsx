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
      className={`${activeTab === value ? 'font-semibold text-emerald-600 border-b-2 border-emerald-600' : 'bg-transparent'} px-2 flex justify-center tracking-wide font-semibold text-zinc-700`}
      onClick={() => onSetActiveTab(value)}>
      <span>{name}</span>
    </div>
  );
}
