'use client';
import SettingsTabs from '@/components/settings/tabs/settings-tabs';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SettingsPage() {
  const handleTabChange = (tab: string) => {};
  return (
    <div className='pt-20 md:pt-6 flex flex-col space-y-6 md:pl-6'>
      <div className='flex items-center space-x-2 '>
        <SettingsIcon
          className='text-zinc-200 dark:text-zinc-400 bg-zinc-400/70 dark:bg-zinc-700/70 w-10 h-10 p-1 rounded-lg'
          style={{fontSize: '1.953rem'}}
        />
        <span className='text-xl font-medium tracking-wide text-zinc-700 dark:text-zinc-300'>Settings</span>
      </div>
      <SettingsTabs onTabChange={(value: string) => handleTabChange(value)} />
    </div>
  );
}
