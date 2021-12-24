import { useContext, useState, createContext } from 'react';
import { login, setRefreshToken, setAccessToken } from './auth';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    // try {
    //     const data = await getUserRequest();
    //     setUser({ name: data.user.name, email: data.user.email });
    // }
    // catch (ex){
      console.log('getUser');
//    }
  };

  
  const logIn = async (email, password) => {
    try {
      const data = await login(email, password);
      console.log(JSON.stringify(data))
      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)
    }
    catch (ex){
      console.log(ex.message);
    }
  };

  const logOut = async () => {
    // try {
    //     await logoutRequest();
      
    //     setAccessToken('')
    //     setRefreshToken('')
    //     setUser(null);
    // } catch (ex){
      console.log('logOut');
    // }
  };

  return {
    user,
    getUser,
    logIn,
    logOut
  };
}