import SearchPage from '@/components/search-page';
import { Suspense } from 'react';

export default function BuscarPage() {
  return (
    <Suspense fallback={<div>Carregando busca...</div>}>
      <SearchPage />
    </Suspense>
  );
}
