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

};

  
  const logIn = async (email, password) => {
    try {
      const data = await login(email, password);
      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)
    }
    catch (ex){
    }
  };

  const logOut = async () => {
  };

  return {
    user,
    getUser,
    logIn,
    logOut
  };
}
