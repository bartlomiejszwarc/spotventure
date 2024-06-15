import {cn} from '@/lib/utils';

function Skeleton({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted bg-zinc-300 dark:bg-zinc-800', className)} {...props} />;
}

export {Skeleton};
