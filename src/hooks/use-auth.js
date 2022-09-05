import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import endPoints from '@api/index';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const ProviderAuth = ({ children }) => {
  const auth = useProviderAuth();

  useEffect(() => {
    const authentication = async () => {
      try {
        await auth.auth();
      } catch (error) {
        console.log(error);
      }
    };
    authentication();
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  if (cookie.get('token-public-stream')) {
  }

  const options = {
    Headers: {
      accept: '*/*',
      'content-Type': 'aplication/json',
    },
  };

  const logOut = () => {
    cookie.remove('token-public-stream');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    // if (router.pathname != '/') window.location = router.pathname;
  };
  const auth = async () => {
    try {
      const { data: userProfile } = await axios.post(
        endPoints.users.profile,
        { token: cookie.get('token-public-stream') },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setUser(userProfile);
      return 'ok';
    } catch (e) {
      logOut();
      return error;
    }
  };
  const signIn = async (body) => {
    try {
      const response = await axios.post(endPoints.users.login, body, options);
      const { access_token } = response.data;

      if (access_token) cookie.set('token-public-stream', access_token, { expires: 30 });

      // axios.defaults.headers.Authorization = `${cookie.get('token-public-stream')}`;
      auth();
      return response.data;
    } catch (e) {
      throw e;
    }
  };
  const signUp = async (body) => {
    try {
      const response = await axios.post(endPoints.users.add, body, options);
      return response.data;
    } catch (e) {
      throw e;
    }
  };

  return {
    user,
    signIn,
    signUp,
    logOut,
    auth,
    error,
    setError,
  };
};
