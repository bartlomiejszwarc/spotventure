'use client';
import MovingText from 'react-moving-text';
import SvgDone from './svg-done';

function CreatePostDialogSuccess() {
  return (
    <div className='h-96 w-3/4 lg:w-full flex flex-col justify-center items-center space-y-6'>
      <MovingText
        type='zoomIn'
        duration='500ms'
        delay='0s'
        direction='normal'
        timing='ease-out'
        iteration='1'
        fillMode='none'>
        <span className='text-2xl'>
          <SvgDone />
        </span>
      </MovingText>

      <MovingText
        type='slideInFromLeft'
        duration='1000ms'
        delay='0s'
        direction='normal'
        timing='ease'
        iteration='1'
        fillMode='none'>
        <span className='text-xl lg:text-2xl font-manrope'>Your post was created</span>
      </MovingText>
    </div>
  );
}
export default CreatePostDialogSuccess;
