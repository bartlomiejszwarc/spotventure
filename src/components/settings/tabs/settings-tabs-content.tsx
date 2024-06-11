import {ReactNode} from 'react';
import {useContext} from 'react';
import {TabContext} from './settings-tabs';
interface Props {
  children: ReactNode;
  value: string;
}
export default function SettingsTabsContent({children, value}: Props) {
  const activeTab = useContext(TabContext);
  if (value === activeTab) {
    return (
      <div>
        <div>{children}</div>
      </div>
    );
  }
}
