import PropagateLoader from 'react-spinners/PropagateLoader';

function CreatePostDialogSpinner() {
  const color = '#10b981';
  return (
    <div className='w-full h-96 flex items-center justify-center'>
      <PropagateLoader color={color} />
    </div>
  );
}
export default CreatePostDialogSpinner;
