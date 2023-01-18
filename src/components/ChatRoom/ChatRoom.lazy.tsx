import React, { lazy, Suspense } from 'react';

const LazyChatRoom = lazy(() => import('./ChatRoom'));

const ChatRoom = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyChatRoom {...props} />
  </Suspense>
);

export default ChatRoom;
