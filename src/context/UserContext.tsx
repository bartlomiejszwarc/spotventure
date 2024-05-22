'use client';
import {IUser} from '../database/actions/userAction';
import {createContext, useReducer, useContext, useState, useEffect} from 'react';
import {app, auth} from '@/firebase/config';
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
  //type :
  switch (action.type) {
    case 'SET_USER_DATA':
      return {...state, user: action.payload};
  }
};

export const UserContextProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(userReducer, {user: null});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(true);
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<IUser | null>(null);
  const {getUserData} = useUserData();

  useEffect(() => {
    if (user) {
      const fetchUserDetails = async () => {
        try {
          const res = await getUserData(user.uid);
          if (res) {
            dispatch({type: 'SET_USER_DATA', payload: res});
            redirect('/home');
          }
        } catch (error) {}
      };
      fetchUserDetails();
    }
  }, [user]);
  return <UserContext.Provider value={{...state, dispatch}}>{children}</UserContext.Provider>;
};
