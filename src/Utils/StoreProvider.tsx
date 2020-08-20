import React, {useState, useMemo} from 'react';

export interface StoreProviderInterface {
  newBook?: Data;
  bestSellerBook?: Data;
  categoryData?: Data;
  userInfo?: Data;
}

export interface Data {
  data: any;
  setData: Function;
}

export const GlobalContext = React.createContext<StoreProviderInterface>({});

const StoreProvider = ({children}) => {
  const [newBook, setNewBook] = useState();
  const [bestSellerBook, setBestSellerBook] = useState();
  const [categoryData, setCategoryData] = useState();
  const [userInfo, setUserInfo] = useState();

  const newBookProvider = useMemo(
    () => ({data: newBook, setData: setNewBook}),
    [newBook],
  );
  const bestSellerBookProvider = useMemo(
    () => ({data: bestSellerBook, setData: setBestSellerBook}),
    [bestSellerBook],
  );
  const categoryDataProvider = useMemo(
    () => ({data: categoryData, setData: setCategoryData}),
    [categoryData],
  );
  const userInfoProvider = useMemo(
    () => ({data: userInfo, setData: setUserInfo}),
    [userInfo],
  );

  const store = useMemo<StoreProviderInterface>(
    () => ({
      newBook: newBookProvider,
      bestSellerBook: bestSellerBookProvider,
      categoryData: categoryDataProvider,
      userInfo: userInfoProvider,
    }),
    [
      bestSellerBookProvider,
      categoryDataProvider,
      newBookProvider,
      userInfoProvider,
    ],
  );

  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};

export default StoreProvider;
