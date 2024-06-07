'use client';
import {createContext, useReducer, useState, useEffect} from 'react';

interface Props {
  children: React.ReactNode;
}

interface IPost {
  likesCount: number;
}
interface IPostAction {
  type: string;
  payload: any;
}

interface IPostState extends IPost {
  dispatch: React.Dispatch<IPostAction>;
}
export const PostContext = createContext<IPostState | null>(null);

export const userReducer = (state: IPostState, action: IPostAction): any => {
  switch (action.type) {
    case 'SET_POST_LIKES_COUNT':
      return {...state, likesCount: action.payload};

    case 'INCREASE_LIKES_COUNT': {
      return {...state, likesCount: state.likesCount + 1};
    }
    case 'DECREASE_LIKES_COUNT': {
      return {...state, likesCount: state.likesCount - 1};
    }

    default:
      return state;
  }
};

export const PostContextProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(userReducer, {likesCount: null});

  return <PostContext.Provider value={{...state, dispatch}}>{children}</PostContext.Provider>;
};
