import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [apiToken, setApiToken] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = async (name, email, password, password_confirmation) => {
    setIsLoading(true);
    try {
        const response  = await axios.post(`${BASE_URL}/auth/register`, {
          name,
          email,
          password,
          password_confirmation,
        });
        login(email,password);
    } 
    catch (error) {
        console.log(`register error ${error}`);
        setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
        const response  = await axios.post(`${BASE_URL}/auth/token`, {
          email,
          password,
        });
        let apiToken = response.data;
        console.log(apiToken);
        setApiToken(apiToken);
        AsyncStorage.setItem('apiToken', JSON.stringify(apiToken));
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${apiToken.access_token}`;
        
        const res = await axios.get(`${BASE_URL}/me`);
        let userInfo = res.data.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        setIsLoading(false);
    } 
    catch (error) {
        console.log(`loging error ${error}`);
        setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
        const response  = await axios.post(`${BASE_URL}/auth/logout`,{});
        AsyncStorage.removeItem('apiToken');
        setApiToken({});
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
    } 
    catch (error) {
        console.log(`logout error ${error}`);
        setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let apiToken = await AsyncStorage.getItem('apiToken');
      apiToken = JSON.parse(apiToken);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (apiToken) {
        setApiToken(apiToken);
        setUserInfo(userInfo);
        axios.defaults.headers.common['Authorization'] = `Bearer ${apiToken.access_token}`;
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        apiToken,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};