'use client';
import {useState} from 'react';
import SettingsTabsTrigger from './settings-tabs-trigger';
import SettingsTabsContent from './settings-tabs-content';
import SettingsPageAccount from '../account/settings-page-account';
import {createContext} from 'react';
import SettingsPageSecuity from '../security/settings-page-secuity';

export const TabContext = createContext('account');
export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState<string>('account');
  const tabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <TabContext.Provider value={activeTab}>
      <div className='flex space-x-5 w-full border-b-[1px] border-zinc-300 dark:border-zinc-600 h-8'>
        <SettingsTabsTrigger value={'account'} name={'Account'} activeTab={activeTab} onTabChange={tabChange} />
        <SettingsTabsTrigger value={'password'} name={'Security'} activeTab={activeTab} onTabChange={tabChange} />
      </div>
      <SettingsTabsContent value='account'>
        <SettingsPageAccount />
      </SettingsTabsContent>
      <SettingsTabsContent value='password'>
        <SettingsPageSecuity />
      </SettingsTabsContent>
    </TabContext.Provider>
  );
}
