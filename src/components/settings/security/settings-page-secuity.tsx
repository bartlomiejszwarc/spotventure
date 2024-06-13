import ChangePassword from './change-password';
import DeleteAccount from './delete-account';
import VisibilitySetting from './visibility-setting';
export default function SettingsPageSecuity() {
  return (
    <div className='flex flex-col space-y-10 '>
      <VisibilitySetting />
      <ChangePassword />
      <DeleteAccount />
    </div>
  );
}
