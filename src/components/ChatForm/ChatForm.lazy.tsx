import React, { lazy, Suspense } from 'react';

const LazyChatForm = lazy(() => import('./ChatForm'));

const ChatForm = (props: { scrollToBottom: () => void }) => (
  <Suspense fallback={null}>
    <LazyChatForm {...props} />
  </Suspense>
);

export default ChatForm;
