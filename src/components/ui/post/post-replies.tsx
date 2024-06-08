'use client';
import {usePostContext} from '@/hooks/context/usePostContext';

export default function PostReplies() {
  const {replies} = usePostContext();

  return <>{replies?.map((reply, idx) => <span key={idx}>{reply.text}</span>)}</>;
}
