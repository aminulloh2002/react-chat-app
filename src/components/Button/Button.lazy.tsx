import { lazy, Suspense } from 'react';
import { ButtonProps } from './Button';

const LazyButton = lazy(() => import('./Button'));

const Button = (props: ButtonProps) => (
  <Suspense fallback={null}>
    <LazyButton {...props} />
  </Suspense>
);

export default Button;
