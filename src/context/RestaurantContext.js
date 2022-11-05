import React, { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext();

export const StoreProvider = ({children})=> {

    const [currentStore, setCurrentStore] = useState(null)

    return (
        <StoreContext.Provider value={{currentStore, setCurrentStore}}>
          {children}
        </StoreContext.Provider>
    )

}