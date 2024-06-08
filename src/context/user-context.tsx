'use client';
import {IUser} from '@/interfaces/user-interface';
import {createContext, useReducer, useState, useEffect} from 'react';
import {auth} from '@/firebase/config';
import {useAuthState} from 'react-firebase-hooks/auth';
import {redirect} from 'next/navigation';
import {useUserData} from '@/hooks/user/useUserData';

interface Props {
  children: React.ReactNode;
}

interface IUserContext {
  user: IUser | null;
}
interface IUserAction {
  type: string;
  payload: any;
}

interface IResponse {
  success: boolean;
  user: IUser;
}

interface IUserContextState extends IUserContext {
  dispatch: React.Dispatch<IUserAction>;
}
export const UserContext = createContext<IUserContextState | null>(null);

export const userReducer = (state: IUserContextState, action: IUserAction): any => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {...state, user: action.payload};
    case 'ADD_TO_USER_FAVORITES':
      return {
        ...state,
        user: {
          ...state.user,
          likedPosts: [...(state.user?.likedPosts || []), action.payload],
        },
      };
    case 'REMOVE_FROM_USER_FAVORITES':
      return {
        ...state,
        user: {
          ...state.user,
          likedPosts: state?.user?.likedPosts?.filter((id) => id !== action.payload),
        },
      };
    case 'ADD_TO_FOLLOWING':
      return {
        ...state,
        user: {...state.user, following: [...(state.user?.following || []), action.payload]},
      };
    case 'REMOVE_FROM_FOLLOWING':
      return {
        ...state,
        user: {
          ...state.user,
          following: state?.user?.following?.filter((id) => id !== action.payload),
        },
      };

    default:
      return state;
  }
};

export const UserContextProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(userReducer, {user: null});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<IUser | null>(null);
  const {getUserData} = useUserData();

  useEffect(() => {
    if (user) {
      const fetchUserDetails = async () => {
        try {
          const res = await getUserData(user.uid);
          if (res) {
            dispatch({type: 'SET_USER_DATA', payload: res.data.user});
          }
        } catch (error) {}
      };
      fetchUserDetails();
    }
  }, [user]);

  return <UserContext.Provider value={{...state, dispatch}}>{children}</UserContext.Provider>;
};
