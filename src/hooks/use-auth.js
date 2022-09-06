import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import endPoints from '@api/index';
import { useRouter } from 'next/router';
import Dexie from 'dexie';

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
  const [cart, setCart] = useState([]);
  const [monthsToPay, setMonths] = useState(1);

  const router = useRouter();

  // Data base
  const getData = async () => {
    const allData = await db.platforms.toArray();
    setCart(allData);
  };

  const setMonthsToPay = (num) => {
    setMonths(num);
    cookie.set('stream-month', num, { expires: 80 });
  };

  useEffect(() => {
    const getData = async () => {
      const allData = await db.platforms.toArray();
      setCart(allData);
      if (cookie.get('stream-month')) setMonthsToPay(cookie.get('stream-month'));
    };
    getData();
  });

  const db = new Dexie('StreamBase');

  db.version(1).stores({
    platforms: '++id, platform',
  });

  db.open().catch((e) => console.log(e));

  // end Data base

  const addToCart = (product) => {
    db.platforms.add(product).then(() => getData());
  };

  const removeFromCart = (id) => {
    db.platforms.delete(id).then(() => getData());
  };

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
    } catch (error) {
      logOut();
      return error;
    }
  };
  const signIn = async (body) => {
    try {
      const response = await axios.post(endPoints.users.login, body, options);
      const { access_token } = response.data;

      if (access_token) cookie.set('token-public-stream', access_token, { expires: 80 });

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
    cart,
    addToCart,
    removeFromCart,
    monthsToPay,
    setMonthsToPay,
  };
};
