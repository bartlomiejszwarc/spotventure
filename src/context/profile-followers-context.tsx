'use client';
import {createContext, useReducer, useState, useEffect} from 'react';

interface Props {
  children: React.ReactNode;
}

interface IProfileFollowers {
  followers: string[] | null;
  following: string[] | null;
}
interface IProfileFollowersAction {
  type: string;
  payload: any;
}

interface IProfileFollowersState extends IProfileFollowers {
  dispatch: React.Dispatch<IProfileFollowersAction>;
}
export const ProfileFollowersContext = createContext<IProfileFollowersState | null>(null);

export const userReducer = (state: IProfileFollowersState, action: IProfileFollowersAction): any => {
  switch (action.type) {
    case 'SET_PROFILE_FOLLOWERS':
      return {...state, followers: action.payload.followers, following: action.payload.following};
    case 'ADD_TO_PROFILE_FOLLOWERS':
      return {
        ...state,
        followers: [...(state.followers || []), action.payload],
      };
    case 'REMOVE_FROM_PROFILE_FOLLOWERS':
      return {
        ...state,
        followers: state?.followers?.filter((id) => id !== action.payload),
      };

    default:
      return state;
  }
};

export const ProfileFollowersProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(userReducer, {followers: null, following: null});

  return <ProfileFollowersContext.Provider value={{...state, dispatch}}>{children}</ProfileFollowersContext.Provider>;
};
