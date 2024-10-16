import React, { createContext, useState, ReactNode } from 'react';
import { Product } from '../shared/types';

interface AppContextProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <AppContext.Provider value={{ products, setProducts, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};
