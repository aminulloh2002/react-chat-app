import React, { lazy, Suspense } from 'react';

const LazySignOut = lazy(() => import('./SignOut'));

const SignOut = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySignOut {...props} />
  </Suspense>
);

export default SignOut;
