import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext
} from "react";
import { apiFetch } from "utils/useFetch";

export const AuthContext = createContext(null);

const initialAuthData = {};

const ensureAuth = async setAuthData => {
  const [err, userData] = await apiFetch("me");
  if (err) setAuthData(err);
  setAuthData(userData);
};

const AuthProvider = props => {
  const [authData, setAuthData] = useState(initialAuthData);

  useEffect(() => {
    ensureAuth(setAuthData);
  }, []);

  const onLogout = () => setAuthData(initialAuthData);

  const onLogin = async () => {
    ensureAuth(setAuthData);
  };

  const authObject = useMemo(() => ({ authData, onLogin, onLogout }), [
    authData
  ]);

  return <AuthContext.Provider value={authObject} {...props} />;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
