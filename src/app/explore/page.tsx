import {Suspense} from 'react';
import SearchPage from './search-page';

export default function Page() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
