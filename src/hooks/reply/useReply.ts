'use client';
import {IReply} from '@/interfaces/reply-interface';
import axios from 'axios';
import {useState} from 'react';

export const useReply = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const sendReply = async (data: IReply) => {
    try {
      setProcessing(true);
      const headers = {
        'Content-Type': 'application/json',
      };
      const res = await axios.post(`/api/posts/${data.sourceId}/reply`, data, {headers: headers});
      setProcessing(false);
      return res.data.reply;
    } catch (error) {
      setProcessing(false);
    }
  };
  const getReplies = async (id: string) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const res = await axios.get(`/api/posts/${id}/reply`, {headers});
      return res.data.replies;
    } catch (error) {}
  };

  return {sendReply, getReplies, processing};
};
