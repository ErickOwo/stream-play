import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import endPoints from '@api/index';
import { useRouter } from 'next/router';
import Dexie from 'dexie';
// import { indexedDB, IDBKeyRange } from "fake-indexeddb";

const AuthContext = createContext();

export const ProviderAuth = ({ children }) => {
  const auth = useProviderAuth();

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
  const [streamDisney, setStreamDisney] = useState([]);
  const [streamHBO, setStreamHBO] = useState([]);
  const [streamPrime, setStreamPrime] = useState([]);
  const [streamParamount, setStreamParamount] = useState([]);
  const [streamStar, setStreamStar] = useState([]);

  const router = useRouter();

  // Data base
  const getData = async () => {
    const allData = await db.platforms.toArray();
    const disneyData = allData.filter((data) => data.code == 0);
    const hboData = allData.filter((data) => data.code == 1);
    const primeData = allData.filter((data) => data.code == 2);
    const paramountData = allData.filter((data) => data.code == 3);
    const starData = allData.filter((data) => data.code == 4);

    setCart(allData);
    setStreamDisney(disneyData);
    setStreamHBO(hboData);
    setStreamPrime(primeData);
    setStreamParamount(paramountData);
    setStreamStar(starData);
  };

  const setMonthsToPay = (num) => {
    setMonths(num);
    cookie.set('stream-month', num, { expires: 80 });
  };

  useEffect(() => {
    if(cookie.get('stream-month')) setMonths(parseInt(cookie.get('stream-month')))

    const authentication = async () => {
      try {
        await auth();
      } catch (error) {
        console.log(error);
      }
    };
    authentication();
    getData();
  }, []);

  const db = new Dexie('StreamBase');

  db.version(1).stores({
    platforms: '++id, platform',
  });

  db.open().catch((e) => console.log(e));

  // end Data base

  const addToCart = (product) => {
    db.platforms.add(product).then(() => getData());
  };

  const deleteFromCart = async (code) => {
    let product;
    if (code == 0 && streamDisney.length >= 0) product = streamDisney[streamDisney.length - 1];
    if (code == 1 && streamHBO.length >= 0) product = streamHBO[streamHBO.length - 1];
    if (code == 2 && streamPrime.length >= 0) product = streamPrime[streamPrime.length - 1];
    if (code == 3 && streamParamount.length >= 0) product = streamParamount[streamParamount.length - 1];
    if (code == 4 && streamStar.length >= 0) product = streamStar[streamStar.length - 1];

    if (!product) return;
    await db.platforms.delete(product.id);
    getData();
  };

  const removeFromCart = async (id) => {
    await db.platforms.delete(id);
    getData();
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
    streamDisney,
    streamHBO,
    streamPrime,
    streamParamount,
    streamStar,
    deleteFromCart,
  };
};
