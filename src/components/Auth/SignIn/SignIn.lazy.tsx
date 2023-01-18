import { lazy, Suspense } from 'react';

const LazySignIn = lazy(() => import('./SignIn'));

const SignIn = (props: any) => (
  <Suspense fallback={null}>
    <LazySignIn {...props} />
  </Suspense>
);

export default SignIn;
