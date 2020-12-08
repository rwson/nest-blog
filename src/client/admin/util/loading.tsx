import React from 'react';
import dynamic from 'next/dynamic';
import LoadingSpin from '@/client/admin/components/loading';

export const noSSRWithLoadingDynamic = (component) => {
  return dynamic(() => component, {
    ssr: false,
    loading: () => <LoadingSpin />
  });
};
