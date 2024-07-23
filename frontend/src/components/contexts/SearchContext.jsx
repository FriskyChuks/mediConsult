// src/SearchContext.js
import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, email, setEmail }}>
      {children}
    </SearchContext.Provider>
  );
};
