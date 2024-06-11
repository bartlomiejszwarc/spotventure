import {useState} from 'react';
import SettingsTabsTrigger from './settings-tabs-trigger';
import SettingsTabsContent from './settings-tabs-content';
import SettingsPageAccount from '../settings-page-account';
import {createContext} from 'react';
import SettingsPagePassword from '../settings-page-password';

interface Props {
  onTabChange: any;
}
export const TabContext = createContext('account');
export default function SettingsTabs({onTabChange}: Props) {
  const [activeTab, setActiveTab] = useState<string>('account');
  const tabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <TabContext.Provider value={activeTab}>
      <div className='flex space-x-5 w-full border-b-[1px] border-zinc-300 h-8'>
        <SettingsTabsTrigger value={'account'} name={'Account'} activeTab={activeTab} onTabChange={tabChange} />
        <SettingsTabsTrigger value={'password'} name={'Security'} activeTab={activeTab} onTabChange={tabChange} />
      </div>
      <SettingsTabsContent value='account'>
        <SettingsPageAccount />
      </SettingsTabsContent>
      <SettingsTabsContent value='password'>
        <SettingsPagePassword />
      </SettingsTabsContent>
    </TabContext.Provider>
  );
}
