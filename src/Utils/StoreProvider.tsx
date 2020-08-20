import React, {useState, useMemo} from 'react';

export const GlobalContext = React.createContext<StoreProviderInterface>({});

export interface StoreProviderInterface {
  newBook?: Data;
  bestSellerBook?: Data;
  categoryData?: Data;
}

export interface Data {
  data: any;
  setData: Function;
}

const StoreProvider = ({children}) => {
  const [newBook, setNewBook] = useState();
  const [bestSellerBook, setBestSellerBook] = useState();
  const [categoryData, setCategoryData] = useState();

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

  const store: StoreProviderInterface = {
    newBook: newBookProvider,
    bestSellerBook: bestSellerBookProvider,
    categoryData: categoryDataProvider,
  };

  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};

export default StoreProvider;
