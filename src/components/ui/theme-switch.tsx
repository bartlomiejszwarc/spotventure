'use client';

import * as React from 'react';
import * as ThemeSwitchPrimitives from '@radix-ui/react-switch';

import {cn} from '@/lib/utils';
import {useTheme} from 'next-themes';
import {SunIcon, MoonIcon} from '@heroicons/react/24/solid';
const ThemeSwitch = React.forwardRef<
  React.ElementRef<typeof ThemeSwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ThemeSwitchPrimitives.Root>
>(({className, ...props}, ref) => {
  const {theme, setTheme} = useTheme();

  const isChecked = theme === 'dark';

  const handleChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <ThemeSwitchPrimitives.Root
      className={cn(
        'peer inline-flex h-7 w-14 shrink-0  cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zinc-800 data-[state=unchecked]:bg-zinc-200',
        className,
      )}
      {...props}
      ref={ref}
      checked={isChecked}
      onCheckedChange={handleChange}>
      <ThemeSwitchPrimitives.Thumb
        className={cn(
          'shpointer-events-none block h-6 w-6 rounded-full data-[state=checked]:bg-sky-950 data-[state=unchecked]:bg-sky-400 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0',
        )}>
        {isChecked ? (
          <div className='flex items-center justify-center h-6 w-6'>
            <MoonIcon className='h-5 w-5 text-zinc-400' />
          </div>
        ) : (
          <div className='flex items-center justify-center h-6 w-6'>
            <SunIcon className='h-5 w-5 text-yellow-300' />
          </div>
        )}
      </ThemeSwitchPrimitives.Thumb>
    </ThemeSwitchPrimitives.Root>
  );
});

ThemeSwitch.displayName = ThemeSwitchPrimitives.Root.displayName;

export {ThemeSwitch};
